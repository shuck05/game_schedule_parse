import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles/Header.css";
import { useNavigate } from "react-router-dom";
import { logout, currentUser } from "../parse/LoginAPI";
import { useState, useEffect } from "react";

function Header(props) {
  const [userMail, setUserMail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("HeaderUseEffect");
    currentUserMail();
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  function home() {
    props.setNewEntry(false);
    props.setActiveEvent(null);
  }

  function currentUserMail() {
    currentUser().then((user) => {
      if (user === null) return;
      setUserMail(user.attributes.username);
    });
  }

  function settings() {
    alert("settings");
  }
  return (
    <div className="Background">
      <h2 onClick={home}>Spielplan Schosch</h2>
      <h4>{userMail}</h4>
      <div className="Button-Row">
        <IconButton onClick={settings}>
          <SettingsIcon sx={{ color: "white" }}></SettingsIcon>
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon sx={{ color: "white" }}></LogoutIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
