// src/components/Chats.jsx (Admin)
import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STUDENT_OPTIONS } from '../graphql/queries';
import './../styles/dashboard.css';
import './../styles/chats.css';
import './../styles/general.css';
import { useNavigate } from 'react-router-dom';

export default function Chats() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);
  const { data } = useQuery(GET_STUDENT_OPTIONS);
  const students = data?.getStudentOptions || [];
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    ws.current = new WebSocket(`ws://localhost:5000?token=${token}`);

    ws.current.onmessage = (event) => {
      const { type, message } = JSON.parse(event.data);
      if (type === 'NEW_MESSAGE') {
        setMessages(prev => [...prev, message]);
      }
    };

    return () => ws.current?.close();
  }, []);

  const sendMessage = () => {
    if (!newMessage || !selectedUser) return;
    
    ws.current.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      receiver: selectedUser.id,
      content: newMessage
    }));
    
    setNewMessage('');
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="nav bg-gray-800 p-4 flex justify-between items-center">
        <div className="admin-info flex items-center gap-2">
          <span id="admin-name" className="text-white font-semibold">Admin <span id="adminname"></span></span>
        </div>
        <a href="" className="logout-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
              localStorage.removeItem("currentUser");
              localStorage.removeItem("token");
              navigate("/login");
            }}
        >
          Logout
        </a>
      </div>

      <div className="a flex h-[calc(100vh-4rem)]">
        <div className="sidebar bg-white w-64 border-r">
          <ul className="p-4 space-y-2">
            <li><a href="/admin/:id" className="block p-2 hover:bg-gray-100">Home</a></li>
            <li><a href="/projects" className="block p-2 hover:bg-gray-100">Projects</a></li>
            <li><a href="/tasks" className="block p-2 hover:bg-gray-100">Tasks</a></li>
            <li className="active bg-blue-100"><a href="" className="block p-2 text-blue-600">Chat</a></li>
          </ul>
        </div>

        <div className="chat-container flex flex-1">
          <div className="student-list w-64 bg-white border-r">
            <h2 className="p-4 font-bold border-b">List of Students</h2>
            <div className="students p-4 space-y-2 overflow-y-auto h-[calc(100vh-8rem)]">
              {students.map(student => (
                <div 
                  key={student.id}
                  onClick={() => setSelectedUser(student)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === student.id ? 'bg-blue-50' : ''}`}
                >
                  {student.username}
                </div>
              ))}
            </div>
          </div>

          <div className="chat-window flex-1 flex flex-col">
            <div className="chat-header bg-gray-100 p-4 border-b" id="chatHeader">
              {selectedUser ? `Chatting with ${selectedUser.username}` : 'Select a student'}
            </div>
            
            <div className="chat-body flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" id="chatBody">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${msg.sender.role === 'admin' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
                    <p>{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input border-t p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="messageInput"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border p-2 rounded"
                  placeholder="Type your message..."
                />
                <button
                  id="sendBtn"
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}