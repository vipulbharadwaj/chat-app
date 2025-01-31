import React from 'react'
import './ChatBody.css'

const ChatBody = ({ messages, handleSubmit, socketId, message, setMessage, room}) => {
  return (
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
      <input id='input' type="text" onChange={(e)=>setMessage(e.target.value)} value={message} name="message" placeholder="Type a message..." />
      <input id='input' type="text" onChange={(e)=>setRoom(e.target.value)} value={room} name="room" placeholder="Room Id" />
      <button type="submit" className='sendbtn'>Send <span className="send-icon">➤</span></button>
    </form>
    </div>
  )
}

export default ChatBody
