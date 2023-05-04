import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css'



const NoAccess = () => {

  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/')
  }


  return (
    <div className={styles.entryContainer}>
      <h1 className={styles.title}>Sin Acceso</h1>

        <button className={styles.btnSubmit} onClick={handleClick}>volver a login</button>

    </div>
  );
};

export default NoAccess