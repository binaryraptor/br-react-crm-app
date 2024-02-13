// SignInForm.js
import React, { useState } from 'react';
import './Signin.css';

const SigninForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Check username and password against predefined values for each role
    const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXNhbiIsImlhdCI6MTcwNzgwOTE5MiwiZXhwIjoxNzA3ODk1NTkyfQ.GXyhLagiLh5wwm8zvVPE7F27YFDmQ8TUoDlHB-vGfY_F-5-PxsFCEzPDvWTauIpvfqH7YDPHTaAWVR0MnPrT-A'; // Get the access token from your authentication response
    localStorage.setItem('accessToken', accessToken);
    
    if ((username === 'susan' && password === 'fun123') || (username === 'admin' && password === 'fun123')) {
      onSignIn({ username: 'susan', role: 'admin' });
    } else if ((username === 'mary' && password === 'fun123') || (username === 'manager' && password === 'fun123')) {
      onSignIn({ username: 'mary', role: 'manager' });
    } else if ((username === 'john' && password === 'fun123') || (username === 'employee' && password === 'fun123')) {
      onSignIn({ username: 'john', role: 'employee' });
    } else {
      // Handle incorrect username or password
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="button" onClick={handleSignIn}>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
