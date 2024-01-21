import React, { useState, useEffect } from 'react';
import { sendMsgOpenAI } from "./ChatBot";
import style from "./Chatting.module.css"
import icon from '../../images/Chat.png'
const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatboxActive, setChatboxActive] = useState(false);

  useEffect(() => {
    console.log('State updated:', isChatboxActive);
  }, [isChatboxActive]);

  const handleSendMessage = async () => {
    try {
      const output = await sendMsgOpenAI(message);
      setMessages([...messages, { role: 'user', content: message }, { role: 'support', content: output }]);
      setMessage('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggleChatbox = () => {
    setChatboxActive(!isChatboxActive);
  };
  

  return (
    <div className={`${style.container}`}>
    <div className={style.chatbox}>
    <div className={`${style.chatbox__support} ${isChatboxActive ? style.chatboxx : ''}`}>
          <div className={style.chatbox__header}>
            <div className={style.chatbox__image__header}>
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div className={style.chatbox__content__header}>
              <h4 className={style.chatbox__heading__header}>Chat support</h4>
              <p className={style.chatbox__description__header}>Hi. My name is Harry. How can I help you?</p>
            </div>
          </div>
          <div className={style.chatbox__messages}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === 'user' ? `${style.user_message}` : `${style.support_message}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className={style.chatbox__footer}>
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`${style.chatbox__send__footer} ${style.send__button}`} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
        <div className={style.chatbox__button}>
          <button onClick={handleToggleChatbox}>
            <img src={icon} alt="Chat Icon" />
          </button>
        </div>
      </div>
      </div>
    
  );
};

export default Chatbox;
