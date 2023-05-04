import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../redux/actions';

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let stateLogin = useSelector((state) => state.messageLogin);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLogin(formData));
  };

  useEffect(() => {
    if (stateLogin) {
      if (stateLogin == "ok") {
        navigate("/chat");
      } else alert(stateLogin);
    }
  }, [stateLogin]);

  return (
    <div className={styles.entryContainer}>
      <h1 className={styles.title}>Bienvenido al Chat</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Insert name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Insert Password"
            required
          />
        </div>
        <button className={styles.btnSubmit} type="submit">
          Ingresar al chat
        </button>
      </form>
      <p className={styles.register} onClick={()=>navigate('/register')}>Register here</p>
    </div>
  );
};

export default Auth;