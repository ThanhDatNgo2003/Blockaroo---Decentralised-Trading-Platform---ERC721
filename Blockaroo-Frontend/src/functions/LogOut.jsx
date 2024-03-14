// LogOut.jsx

import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  return { handleLogout };
};

export default useLogout;
