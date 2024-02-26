import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css'; 

const SigninForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/signin', { username, password });
      const { access_token } = response.data;
      localStorage.setItem('accessToken', response.data.accessToken);
      const role = username === 'susan' ? 'admin' : username === 'mary' ? 'manager' : 'employee';
      onSignIn({ role });
    } catch (error) {
      
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-heading">Sign In</h2>
        <div className="signin-inputs">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="signin-input" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="signin-input" />
        </div>
        <button onClick={handleSignIn} className="signin-button">Sign In</button>
      </div>
    </div>
  );
};

export default SigninForm;
