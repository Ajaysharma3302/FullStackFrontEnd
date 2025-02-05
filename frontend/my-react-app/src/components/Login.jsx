import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../components/api/api';
import AuthContext from '../context/AuthContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await login({ email, password });
        loginUser(response.data.token);
        navigate('/products');
      } catch (error) {
        setError('Invalid credentials');
        console.log(error)
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;