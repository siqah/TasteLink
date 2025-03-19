// import { useState } from 'react';
// import { useChat } from './ChatProvider';

// const ChatWindow = () => {
//   const { messages, sendMessage } = useChat();
//   const [newMessage, setNewMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       sendMessage(newMessage);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map(message => (
//           <div 
//             key={message.id}
//             className={`message ${message.senderId === JSON.parse(localStorage.getItem('user')).uid ? 'sent' : 'received'}`}
//           >
//             <p>{message.text}</p>
//             <small>{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</small>
//           </div>
//         ))}
//       </div>
      
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatWindow;