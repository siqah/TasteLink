import  { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signup');
  };

  return <button onClick={handleLogout} 
   className="text-orange-500 font-medium hover:text-orange-900 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
>Logout</button>;
};

export default Logout;
