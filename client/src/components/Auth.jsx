import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { postUser, setLoading } from '../redux/actions';


const Auth = () => {

  const statusLoading = useSelector((state)=>state.statusLoading)
  const [formData, setFormData] = useState({
    name: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let stateLogin = useSelector((state) => state.messageLogin);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    dispatch(postUser(formData));
  };

  useEffect(() => {
      if (stateLogin.state) {
        navigate("/chat");
      }
      else dispatch(setLoading(false))
  }, [stateLogin]);

  return (
    <div className={styles.entryContainer}>
      {!statusLoading?
      (
        <div className={styles.cardLogin}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Nick Name:
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
        {/* <div className={styles.formGroup}>
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
        </div> */}
        <button className={styles.btnSubmit} type="submit">
          Sing in
        </button>
      </form>
        {/* <div className={styles.register}>
        <p  onClick={()=>navigate('/register')}>Register here</p>
        </div> */}
      </div>)
      :
      (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingDot}></div>
          <div className={styles.loadingMessage}>Loading...</div>
        </div>
      )
      }
    </div>
  );
};

export default Auth;