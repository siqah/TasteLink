import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SearchPage from "./Pages/SearchPage";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./Pages/Profile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
  );
}

export default App;
