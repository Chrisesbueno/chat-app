import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')

    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <h1 className="logo">Chat App</h1>
        <p className="title">Login</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email'/>
          <input type="password" placeholder='password'/>
          <button>Sign In</button>
          {err && (
            <p>Something wen't wrong</p>
          )}
          <p className='info'>You don't have an account? <Link to='/register'>Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login