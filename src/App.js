import React, { useState } from 'react';
import SigninForm from './component/SigninForm';
import CustomerList from './component/CustomerList';

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleSignIn = ({ role }) => {
    setAuthenticatedUser({ role });
  };

  return (
    <div className="App">
      {authenticatedUser ? (
        <CustomerList role={authenticatedUser.role} />
      ) : (
        <SigninForm onSignIn={handleSignIn} />
      )}
    </div>
  );
}

export default App;
