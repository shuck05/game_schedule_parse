import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { login, logout, currentUser } from "../parse/LoginAPI";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameTextfieldChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordTextfieldChange(e) {
    setPassword(e.target.value);
  }

  function handleLogout() {
    logout();
  }

  async function handleLogin() {
    const user = await login(username, password);
    if (!user) return;
    navigate("/");
  }

  function dummy() {
    const user = currentUser();
    user.then((userData) => {
      console.log(userData);
    });
  }

  return (
    <div className="background">
      <div className="center" style={{ minWidth: "20vw" }}>
        <h1>Login for great Sceduling</h1>
        <TextField
          className="loginContent"
          label="Username"
          onChange={handleUsernameTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Password"
          type="password"
          onChange={handlePasswordTextfieldChange}
        ></TextField>
        <Button
          style={{ color: "#61dafb", borderColor: "#61dafb" }}
          className="loginContent"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link to="/signup" style={{ color: "#61dafb" }}>
              Create Account
            </Link>
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={dummy}>LogCurrentUser</Button>
      </div>
    </div>
  );
}

export default LoginPage;
