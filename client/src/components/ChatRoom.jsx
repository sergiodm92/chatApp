import React, { useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  getAllMessages,
  postNewMessage,
  setLoading,
  setStatusPostMessage,
} from "../redux/actions";
import seedrandom from "seedrandom";
import io from "socket.io-client";
import Picker from "emoji-picker-react";

const socket = io("https://chatapp-production-eb2f.up.railway.app");
// const socket = io('http://localhost:3001/');

const Chat = () => {
  const statusLoading = useSelector((state)=>state.statusLoading)
  const [choosenEmoji, setChoosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const userId = +localStorage.getItem("userId");
  const [message, setMessage] = useState({ text: "", userId: userId });
  const messages = useSelector((state) => state.messages);
  const statusPostMessage = useSelector((state) => state.statusPostMessage);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  socket.on("connected", (data) => {
    dispatch(getAllMessages());
    scrollToBottom();
  });

  const handleInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewMessage(message));
    setMessage({ text: "", userId: userId });
  };

  const handleDelete = () => {
    dispatch(deleteChat());
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  function getPastelColor(number) {
    const random = seedrandom(number.toString());
    const hue = Math.floor(random() * 120) + 120;
    const saturation = 60;
    const lightness = 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const setDate = (dateMilisegundos) => {
    const date = new Date(+dateMilisegundos);
    const localDate = date.toLocaleTimeString("es");
    return localDate;
  };

  const handleEmojiClick = (emojiObject) => {
    setChoosenEmoji(emojiObject);
    setShowEmojiPicker(false);
    setMessage({ ...message, text: message.text + emojiObject.emoji });
  };

  useEffect(() => {
    if (statusPostMessage) {
      dispatch(setLoading(true))
      dispatch(getAllMessages());
      dispatch(setLoading(false))
      dispatch(setStatusPostMessage());
    }
  }, [statusPostMessage]);

  return (
    <div className={styles.chatContainer}>
      {!statusLoading ? (
        <div className={styles.chatBox}>
          {messages.map((message, i) => (
            <div className={ userId === message.userId ? styles.boxMytext : styles.boxText } key={i} >
              <div className={ userId === message.userId? styles.chatMyMessage : styles.chatMessage }
                style={{ backgroundColor: getPastelColor(message.userId) }}
              >
                <b>{message.user + " : "}</b> {message.text}
                <p
                  className={
                    userId === message.userId
                      ? styles.messageMyDate
                      : styles.messageDate
                  }
                >
                  {setDate(message.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingMessage}>Loading...</div>
        </div>
      )}
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Write your message here"
          id="text"
          name="text"
          value={message.text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={styles.emojiButton}
        >
          😀
        </div>
        {showEmojiPicker && (
          <div className={styles.picker}>
            <Picker
              onEmojiClick={handleEmojiClick}
              pickerStyle={{
                position: "absolute",
                bottom: "80px",
                right: "10px",
              }}
            />
          </div>
        )}
        {choosenEmoji && <p></p>}
        <button onClick={handleSubmit} className={styles.sendButton}>
          Send
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default Chat;
