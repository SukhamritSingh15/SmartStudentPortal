import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // getAuth is no longer needed here

// Import the pre-initialized auth instance from App.jsx
import { auth } from '../App.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Attempt to sign in with email and password using the imported auth instance
      await signInWithEmailAndPassword(auth, email, password);
      // Success, navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Login Error:", err.code, err.message);
      
      let errorMessage = "Login failed. Please check your credentials.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // If a user is already authenticated (e.g., via the initial token), redirect them immediately
  // We check if auth is defined before accessing auth.currentUser
  if (auth && auth.currentUser && auth.currentUser.uid) {
      navigate('/dashboard');
      return null;
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center text-3xl font-bold mb-6 text-purple-700">Student Portal Login</h2>
        
        {error && (
          <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="form-control shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="form-control shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <a href="/mainpage" className="text-purple-600 hover:text-purple-800 font-semibold">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;