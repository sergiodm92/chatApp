import React, { useEffect, useState } from 'react';
import styles from '../styles/Chat.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, postNewMessage, setStatusPostMessage } from '../redux/actions';

const Chat = () => {

  const dispatch = useDispatch()
  let userId = +localStorage.getItem("userId")

  const [message, setMessage] = useState({text: "", userId: userId})
  let messages = useSelector((state) => state.messages);
  let statusPostMessage = useSelector((state) => state.statusPostMessage);
  

  const handleInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewMessage(message))
    setMessage({text: "", userId: userId})
    // console.log(message)
  }

  useEffect(() => {
    if(statusPostMessage){
    dispatch(getAllMessages())
    dispatch(setStatusPostMessage())
    }
  }, [statusPostMessage]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        {messages?.map((message,i)=>{
          return(
            <div className={userId==message.userId?styles.chatMyMessage:styles.chatMessage} key={i}>
            {message.user + " : " + message.text} 
          </div>
          )
        })

        }
      </div>
      <div className={styles.chatInput}>
        <input 
            type="text"
            placeholder="Escribe tu mensaje aquí"
            id="text"
            name="text"
            value={message.text}
            onChange={handleInputChange}
            />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
