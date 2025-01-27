
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import Login from "./components/Login";
import Signup from './components/Signup';
import Products from './components/Products';
import './App.css'

function App() {


  return (
    <>
    <AuthProvider>
      <Router>
        <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link> | <Link to="/products">Products</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </AuthProvider>
    
    </>
  )
}
export default App
