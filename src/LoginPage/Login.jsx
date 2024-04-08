import React, { useState, useEffect } from 'react';
import "./Login.css";
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/Store';

const Login = () => {
  const { UserData } = useAuth();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [data, setData] = useState('');

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // Set user's email to data state
        setData(user.email);
      } else {
        setAuthUser(null);
        // Clear data state if user signs out
        setData('');
      }
    });
  }, []);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/");
      UserData(userCredential.user.email);
      setData(userCredential.user.email);
      localStorage.setItem('userEmail', user.email);
    } catch (err) {
      console.log(err);
    }
    setUser({
      email: '',
      password: ''
    });
  };

  const signOutUser = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful
        console.log('User signed out');
        UserData("signed out");
        setData(''); // Clear data state on sign out
        localStorage.removeItem('userEmail');
      })
      .catch((error) => {
        // An error occurred
        console.error('Error signing out:', error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        {!authUser ? (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4 bg-white">Login Page</h1>
            <div className="mb-4 bg-white">
              <label htmlFor="email" className=" bg-white block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" value={user.email} onChange={handleInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white" placeholder="Enter your Email" required />
            </div>
            <div className="mb-6 bg-white">
              <label htmlFor="password" className=" bg-white block text-gray-700 font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" value={user.password} onChange={handleInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white" placeholder="Password" required />
            </div>
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
            <div className='text-black mt-4 bg-white'>Don't have an account <Link to="/Signin" className="text-blue-500 bg-white ">Create Account here</Link></div>
          </form>
        ) : (
          <div>
            <div className='text-white'>Your email: {data}</div>
            <button onClick={signOutUser} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Out</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
