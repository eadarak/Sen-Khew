import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

// ... (autres importations)

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [redirectToMain, setRedirectToMain] = useState(false);
  
    const navigate = useNavigate();
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setErrors({ ...errors, [name]: '' });
      if (name === 'username') {
        setUsername(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
  
      if (!username.trim()) {
        newErrors.username = 'Le nom est requis.';
      }
  
      if (!password.trim()) {
        newErrors.password = 'Le mot de passe est requis.';
      }
  
      return newErrors;
    };
  
    const handleSubmit = () => {
      const newErrors = validateForm();
  
      if (Object.keys(newErrors).length === 0) {
        onLogin(username);
        setUsername('');
        setPassword('');
        setErrors({});
        setRedirectToMain(true);
      } else {
        setErrors(newErrors);
      }
    };
  
    if (redirectToMain) {
      navigate('../../pages/Home');
      return null;
    }
  
    return (
      <div className="form-container">
        <h2 style={{ color: '#000' }}>Ravis de vous revoir!</h2>
        <form id="loginForm">
          <label style={{ color: '#000' }} htmlFor="username">
            Nom :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.username}</span>
          <br />
  
          <label style={{ color: '#000' }} htmlFor="password">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <span className="error">{errors.password}</span>
          <br />
  
          <button
            style={{ background: '#D8A43E', color: '#fff' }}
            type="button"
            onClick={handleSubmit}
          >
            Se Connecter
          </button>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
  
