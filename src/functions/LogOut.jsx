// LogOut.jsx



const useLogout = () => {


  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.clear();
    localStorage.clear();
  };

  return { handleLogout };
};

export default useLogout;
