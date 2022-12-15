import React, { useContext, useEffect } from 'react'
import { useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef()

  const date = new Date(message.date.seconds * 1000).toLocaleDateString("en-US")


  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});

  }, [message])
  
  
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
        <div className="messageInfo">
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
          <p className='date'>{date}</p>
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message