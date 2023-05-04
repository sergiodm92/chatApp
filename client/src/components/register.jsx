import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import { postUser } from "../redux/actions";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let stateRegister = useSelector((state) => state.messageRegister);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, repeatPassword } = formData;
    if (name.length < 6) {
      alert("El nombre debe tener al menos 6 caracteres");
    } else if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
    } else if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
    } else {
      dispatch(postUser(formData));
    }
  };

  useEffect(() => {
    if (stateRegister) {
      if (stateRegister == "ok") {
        navigate("/");
      } else alert(stateRegister);
    }
  }, [stateRegister]);

  return (
    <div className={styles.entryContainer}>
      <h1 className={styles.title}>Register</h1>
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
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="repeatPassword">
            Repeat Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            placeholder="Insert Password"
            required
          />
        </div>
        <button className={styles.btnSubmit} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
