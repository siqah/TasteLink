import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./auth/SignUp";
import Logout from "./auth/Logout";
import Profile from "./Pages/Profile";
import Beforelogin from "./Pages/Beforelogin";
import CreatePost from "./Pages/CreatePost";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Beforelogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
  );
}

export default App;
