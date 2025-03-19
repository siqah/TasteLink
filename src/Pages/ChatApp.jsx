// ChatApp.js
import { useState } from "react";
import UserList from "../components/UserList";
import ChatWindow from "../components/ChatWindow";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <UserList selectUser={setSelectedUser} />
      {selectedUser && <ChatWindow selectedUser={selectedUser} />}
    </div>
  );
};

export default ChatApp;
