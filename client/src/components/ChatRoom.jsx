import React, { useEffect, useState } from 'react';
import styles from '../styles/Chat.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, postNewMessage, setStatusPostMessage } from '../redux/actions';
import seedrandom from 'seedrandom';

const Chat = () => {

  const dispatch = useDispatch();
  const userId = +localStorage.getItem('userId');
  const [message, setMessage] = useState({ text: '', userId: userId });
  const messages = useSelector((state) => state.messages);
  const statusPostMessage = useSelector((state) => state.statusPostMessage);


  const handleInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = new Date()
    message.date = date.getTime()
    dispatch(postNewMessage(message));
    setMessage({ text: '', userId: userId });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  function getPastelColor(number) {
    // Creamos un objeto seedrandom con la semilla igual al número de entrada
    const random = seedrandom(number.toString());
  
    // Generamos valores de color aleatorios en el rango [120, 240) para el hue, y fijos para la saturación y luminosidad
    const hue = Math.floor(random() * 120) + 120; // El hue va de 120 a 240 para obtener colores pastel
    const saturation = 60;
    const lightness = 80;
  
    // Convertimos los valores de hue, saturación y luminosidad en una cadena de texto CSS
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  const setDate = (dateMilisegundos) => {
    const date = new Date(+dateMilisegundos);
    const localDate = date.toLocaleTimeString('es');
    return localDate;
  };

  useEffect(() => {
    if (statusPostMessage) {
      dispatch(getAllMessages());
      dispatch(setStatusPostMessage());
    }
  }, [statusPostMessage]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        {messages.map((message, i) => (
          <div className={userId === message.userId ? styles.boxMytext : styles.boxText} key={i}>
            <div
              className={userId === message.userId ? styles.chatMyMessage : styles.chatMessage}
              style={{ backgroundColor: getPastelColor(message.userId)}}
            >
              <b>{message.user + ' : '}</b> {message.text} 
            <p className={userId === message.userId ? styles.messageMyDate : styles.messageDate}>{setDate(message.date)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Escribe tu mensaje aquí"
          id="text"
          name="text"
          value={message.text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;

