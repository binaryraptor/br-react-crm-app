
import './App.css';
import './component/Signin.css'
import './component/CustomerList.css'
import SigninForm from './component/SigninForm';
import CustomerList from './component/CustomerList';
import { useState } from 'react';
function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleSignIn = (user) => {
    setAuthenticatedUser(user);
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
