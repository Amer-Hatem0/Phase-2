// src/components/ChatsStd.jsx (Student)
import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import './../styles/dashboard.css';
import './../styles/chats.css';
import './../styles/general.css';
import { useNavigate } from 'react-router-dom';

export default function ChatsStd() {
  const [messages, setMessages] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);
  const { data } = useQuery(GET_ME);
  const user = data?.me;
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
    if (!newMessage || !selectedAdmin) return;
    
    ws.current.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      receiver: selectedAdmin.id,
      content: newMessage
    }));
    
    setNewMessage('');
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="nav bg-gray-800 p-4 flex justify-between items-center">
        <div className="admin-info flex items-center gap-2">
          <span id="admin-name" className="text-white font-semibold">Student <span id="adminname"></span></span>
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
            <li><a href="/student" className="block p-2 hover:bg-gray-100">Home</a></li>
            <li><a href="/projects" className="block p-2 hover:bg-gray-100">My Projects</a></li>
            <li><a href="/tasks" className="block p-2 hover:bg-gray-100">My Tasks</a></li>
            <li className="active bg-blue-100"><a href="" className="block p-2 text-blue-600">Chat</a></li>
          </ul>
        </div>

        <div className="chat-container flex flex-1">
          <div className="student-list w-64 bg-white border-r">
            <h2 className="p-4 font-bold border-b">List of Users</h2>
            <div className="students p-4 space-y-2 overflow-y-auto h-[calc(100vh-8rem)]">
              <div 
                onClick={() => setSelectedAdmin({ id: 'admin-id', username: 'Admin' })}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedAdmin?.id === 'admin-id' ? 'bg-blue-50' : ''}`}
              >
                Admin
              </div>
            </div>
          </div>

          <div className="chat-window flex-1 flex flex-col">
            <div className="chat-header bg-gray-100 p-4 border-b" id="chatHeader">
              {selectedAdmin ? `Chatting with ${selectedAdmin.username}` : 'Select an admin'}
            </div>
            
            <div className="chat-body flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" id="chatBody">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${msg.sender.role === 'student' ? 'bg-green-500 text-white' : 'bg-white border'}`}>
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
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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