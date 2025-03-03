// import  { useContext } from 'react';
import { useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return <button onClick={handleLogout} 
   className=" font-medium hover:text-orange-400 transition-colors shadow-md rounded-md p-2 sm:text-sm md:text-base"
>Logout</button>;
};

export default Logout;
