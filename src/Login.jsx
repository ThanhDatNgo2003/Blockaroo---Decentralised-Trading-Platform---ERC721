import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from './components/WalletContext';
import login from "./api/login";
import register from "./api/register";
import getUser from "./api/getUser";


// Import your logo image
import logo from './logo.png';

const Login = () => {
  const { setDefaultState } = useWallet();
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case "username":
            setUsername(value);
            break;
        case "password":
            setPassword(value);
            break;
        case "email":
            setEmail(value);
            break;
        default:
            break;
    }
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
      if (password === confirmPassword) {
        getUser(username )
          .then((res) => res.data)
          .then((data) => {
            if (data.exist === "True") {
              register({ username: username, email: email, password: password })
                .then((resp) => resp.data)
                .then((data) => {
                  if (data.hasOwnProperty("message")) {
                    alert(data["message"]);
                    setIsRegister(false);
                  } else {
                    alert(data["error"]);
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              alert("Username is already taken. Please choose another.");
            }
          });
      } else {
        alert("Your confirmed password does not match!");
      }      
    } else {
      login({username: username, password: password})
      .then(resp => resp.data)
      .then(data => {
          if(data.hasOwnProperty("message"))
          {
              console.log(data);
              setDefaultState();
              sessionStorage.setItem('isLoggedIn', 'true');
              sessionStorage.setItem("username", data.username)
              alert(data["message"])
              navigate('/marketplace');
          }
          else alert(data["error"])
      })
      .catch((err) => {
          console.error(err)
      })
    //   // Login logic
    //   const registeredUsers = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
    //   const isUserValid = registeredUsers.some(
    //     (user) => user.userName === formData.userName && user.password === formData.password
    //   );

    //   if (isUserValid) {
    //     sessionStorage.setItem('isLoggedIn', 'true');
    //     sessionStorage.setItem('username', formData.userName);
    //     setDefaultState();
    //     alert('Login successful! Welcome to the Homepage.');
    //     navigate('/marketplace');
    //   } else {
    //     alert('Invalid Username or password. Please try again.');
    //   }
    // }
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
              name="username"
              value={username}
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
                  value={email}
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
              value={password}
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
