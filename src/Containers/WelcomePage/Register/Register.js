import "./Register.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Input from "../../../UI/Input/Input";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.history.replace("/home");
    }
  }, []);

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    document.title = isSignup ? "Register" : "Login";
  }, [isSignup]);

  const switcAuthHandler = () => {
    setIsSignup(!isSignup);
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please Provide Valid Credentials.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (password.length < 6) {
      setError("Password should be of atleast 6 characters.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt7v3kUYonmcmbxZvIgV9MIDmN4G8xq_s",
          { email, password, returnSecureToken: true }
        );
        localStorage.setItem("token", response.data.idToken);
        setToken(response.data.idToken);
        props.history.replace("/home");
      } catch (error) {
        setError("Email exists. Please Login.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please Provide Valid Credentials.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt7v3kUYonmcmbxZvIgV9MIDmN4G8xq_s",
          { email, password, returnSecureToken: true }
        );
        localStorage.setItem("token", response.data.idToken);
        setToken(response.data.idToken);
        props.history.replace("/home");
      } catch (error) {
        setError("Invalid Email or Password.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const authForm = isSignup ? (
    <form onSubmit={registerHandler} className="registerForm">
      <div className="error">{error && <span>*{error}</span>}</div>
      <h2>Register</h2>
      <Input
        label="Username"
        type="text"
        changed={(event) => setUsername(event.target.value)}
        value={username}
      />
      <Input
        label="Email"
        type="email"
        changed={(event) => setEmail(event.target.value)}
        value={email}
      />
      <Input
        label="Password"
        type="password"
        changed={(event) => setPassword(event.target.value)}
        value={password}
      />
      <Input
        label="Confirm Password"
        type="password"
        changed={(event) => setConfirmPassword(event.target.value)}
        value={confirmPassword}
      />
      <button type="submit">REGISTER</button>
      <span>
        Already have an account?
        <span className="switchAuth" onClick={switcAuthHandler}>
          Login.
        </span>
      </span>
    </form>
  ) : (
    <form onSubmit={loginHandler} className="loginForm">
      <div className="error">{error && <span>*{error}</span>}</div>
      <h2>Login</h2>
      <Input
        label="Email"
        type="email"
        changed={(event) => setEmail(event.target.value)}
        value={email}
      />
      <Input
        label="Password"
        type="password"
        changed={(event) => setPassword(event.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
      <span>
        New User?
        <span className="switchAuth" onClick={switcAuthHandler}>
          Register.
        </span>
      </span>
    </form>
  );

  return (
    <div className="Register">
      <img src="https://source.unsplash.com/1600x900/?space" alt="Space" />
      {authForm}
    </div>
  );
};

export default Register;
