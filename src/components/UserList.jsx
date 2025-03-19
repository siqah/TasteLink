// import { useChat } from './ChatProvider';

// const ChatList = () => {
//   const { chats, setSelectedChat } = useChat();

//   return (
//     <div className="chat-list">
//       {chats.map(chat => (
//         <div 
//           key={chat.id}
//           className="chat-item"
//           onClick={() => setSelectedChat(chat.id)}
//         >
//           <h4>{chat.participants.join(', ')}</h4>
//           <p>{chat.lastMessage}</p>
//           <small>{new Date(chat.timestamp?.toDate()).toLocaleTimeString()}</small>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;