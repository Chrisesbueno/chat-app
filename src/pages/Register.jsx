import React, { useState } from 'react'
import addAvatar from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];    

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file)
      .then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              
              await setDoc(doc(db, "userChats", res.user.uid), {});

              navigate('/')

            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        }
      );

    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <h1 className="logo">Chat App</h1>
        <p className="title">Register</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name'/>
          <input type="email" placeholder='email'/>
          <input type="password" placeholder='password'/>
          <input style={{display: 'none'}} type="file" id='file'/>
          <label htmlFor="file">
            <img src={addAvatar} alt="" />
            <p>Add an avatar</p>
          </label>
          <button>Sign Up</button>
          {err && (
            <p>Something wen't wrong</p>
          )}
          <p className='info'>You do have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register