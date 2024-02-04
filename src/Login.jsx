import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './components/WalletContext';

// Import your logo image
import logo from './logo.png';

const Login = () => {
  const { setDefaultState } = useWallet();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNum: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
    setFormData({
      userName: '',
      email: '',
      phoneNum: '',
      password: '',
    });
    setConfirmPassword('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Registration logic with password confirmation
      if (formData.password !== confirmPassword) {
        alert('Passwords do not match. Please enter matching passwords.');
        return;
      }

      const registeredUsers = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
      const isUsernameTaken = registeredUsers.some(
        (user) => user.userName === formData.userName
      );

      if (isUsernameTaken) {
        alert('Username is already taken. Please choose another.');
      } else {
        registeredUsers.push(formData);
        sessionStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        alert('Registration successful! Now you can log in.');
        setIsRegister(false);
      }
    } else {
      // Login logic
      const registeredUsers = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
      const isUserValid = registeredUsers.some(
        (user) => user.userName === formData.userName && user.password === formData.password
      );

      if (isUserValid) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', formData.userName);
        setDefaultState();
        alert('Login successful! Welcome to the Homepage.');
        navigate('/marketplace');
      } else {
        alert('Invalid Username or password. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className={`auth-container ${isRegister ? 'register' : 'login'}`}>
        <div className="title-logo-container">
          <div className="logo-container">
            <img src={logo} alt="Blockaroo Logo" className="logo" />
          </div>
          <h2 className="title">{isRegister ? 'Register to Blockaroo' : 'Login to Blockaroo'}</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">
            Username:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </label>
          {isRegister && (
            <>
              <label className="form-label">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
              <label className="form-label">
                Phone Number:
                <input
                  type="tel"
                  name="phoneNum"
                  value={formData.phoneNum}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </>
          )}
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </label>
          {isRegister && (
            <label className="form-label">
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="form-input"
                required
              />
            </label>
          )}
          <button type="submit" className="form-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        {sessionStorage.getItem('isLoggedIn') === 'true' && (
          <button onClick={handleLogout} className="form-button">
            Logout
          </button>
        )}
        <p className="form-text">
          {isRegister
            ? 'Already have an account?'
            : "Don't have an account yet?"}
          <span className="toggle-link" onClick={handleToggleForm}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
