import React from 'react'
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useState } from 'react';
import { useMemo } from 'react';
import './App.css'


const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const[socketId, setSocketId] = useState("");
  const[messages, setMessages] = useState([]);
  console.log(messages);

  const socket = useMemo(()=>io("http://localhost:3000"), [])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      socket.emit('message', message);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleConnect = () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
    };
  
    const handleMessage = (message) => {
      const newMessage = {
        text: message,
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("receive-message", message);
    };
  
    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);
  
    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
    };
  }, [socket]);
  
  
  return (
    <>
      <div className="chat-container">
    <div className="chat-header">
      <h2>Welcome to Live Chat</h2>
      <span className="socket-id">ID: {socketId}</span>
      <div className="connection-status connected"></div>
      <hr />
    </div>
    <div className="chat-body">
    {messages.map((msg, i) => (
        <div
          key={i}
          className={`message ${msg.sent ? 'sent' : 'received'}`}
        >
          <div className="message-bubble">
            <p>{msg.text}</p>
            <span className="message-time">{msg.time}</span>
          </div>
        </div>
      ))}
    </div>
    <form onSubmit={handleSubmit}>
      <input id='message-input' type="text" onChange={(e)=>setMessage(e.target.value)} value={message} name="message" placeholder="Type a message..." />
      <input id='room-input' type="text" onChange={(e)=>setRoom(e.target.value)} value={room} name="room" placeholder="Room Id" />
      <button type="submit" className='sendbtn'>Send <span className="send-icon">➤</span></button>
    </form>
    </div>
    </>
  )
}

export default App;
