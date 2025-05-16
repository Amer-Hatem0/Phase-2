import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHAT_HISTORY, SEND_MESSAGE } from '../graphql/queries';

export default function ChatWindow({ currentUser, selectedUser }) {
  const [message, setMessage] = useState('');
  const { loading, data, refetch } = useQuery(GET_CHAT_HISTORY, {
    variables: { receiverId: selectedUser?.id }
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 3000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    await sendMessage({
      variables: {
        receiverId: selectedUser.id,
        message: message.trim()
      }
    });
    setMessage('');
    refetch();
  };

  return (
    <div className="flex-1 bg-gray-800 p-4 rounded-r-lg">
      <div className="bg-gray-700 p-4 rounded-t-lg">
        <h3 className="text-white font-semibold">
          Chatting with {selectedUser?.username}
        </h3>
      </div>
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {data?.getChatHistory.map((msg) => (
          <div key={msg.timestamp} className={`flex ${msg.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.sender.id === currentUser.id ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <p className="text-white">{msg.message}</p>
              <span className="text-xs text-gray-300">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-700 text-white rounded-lg p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}