// LoginComponent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "./api";
import styles from "./login.module.scss";

const Login = () => {
  const [isHost, setIsHost] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsHost(!isHost);
    setError(""); // Clear error message when toggling between forms
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      if (
        (isHost && user.role === "host") ||
        (!isHost && user.role === "vendor")
      ) {
        if (user.role === "host") {
          navigate("/dashboard");
        } else if (user.role === "vendor") {
          navigate("/home");
        }
      } else {
        setError("Invalid role for this login form.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "1920px" }}
      className={`${styles.container1} ${
        !isHost ? styles["sign-up-mode"] : ""
      }`}
    >
      <div className={styles.formsContainer1}>
        <div className={styles.signinSignup}>
          <motion.form
            className={`${styles.loginForm} ${styles.signInForm}`}
            initial={{ x: isHost ? "0%" : "-100%", opacity: isHost ? 1 : 0 }}
            animate={{ x: isHost ? "0%" : "-100%", opacity: isHost ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleLogin}
          >
            <h2 className={styles.title}>Host Login</h2>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className={`${styles.btn} ${styles.solid}`}
            />
            {error && <p>{error}</p>}
          </motion.form>
          <motion.form
            className={`${styles.loginForm} ${styles.signUpForm}`}
            initial={{ x: isHost ? "100%" : "0%", opacity: isHost ? 0 : 1 }}
            animate={{ x: isHost ? "100%" : "0%", opacity: isHost ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleLogin}
          >
            <h2 className={styles.title}>Vendor Login</h2>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className={`${styles.btn} ${styles.solid}`}
            />
            {error && <p>{error}</p>}
          </motion.form>
        </div>
      </div>
      <div className={styles.panelsContainer1}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h3>Host Login</h3>
            <p>
              Đây là phần đăng nhập của host. Bạn có thể quản lý tài khoản host
              của mình tại đây.
            </p>
            <button
              className={`${styles.btn} ${styles.transparent}`}
              id="sign-up-btn"
              onClick={handleToggle}
            >
              Vendor Login
            </button>
          </div>
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h3>Vendor Login</h3>
            <p>
              Đây là phần đăng nhập của vendor. Bạn có thể quản lý tài khoản
              vendor của mình tại đây.
            </p>
            <button
              className={`${styles.btn} ${styles.transparent}`}
              id="sign-in-btn"
              onClick={handleToggle}
            >
              Host Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
