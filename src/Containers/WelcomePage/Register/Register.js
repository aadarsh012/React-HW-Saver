import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../UI/Input/Input";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="Register">
      <img src="https://source.unsplash.com/1600x900/?space" alt="Space" />
      <form>
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
        <button type="submit">Register</button>
        <span>
          Already have an account? <Link>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
