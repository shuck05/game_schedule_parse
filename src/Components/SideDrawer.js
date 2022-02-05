import { Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./styles/SideDrawer.css";
import { useState } from "react";
import { useEffect } from "react";
import { handleGetEventsForUser, handleDeleteEvent } from "../parse/EventAPI";
import { currentUser } from "../parse/LoginAPI";

function Sidedrawer(props) {
  const [eventNames, setEventNames] = useState(null);

  useEffect(() => {
    // console.log("Sidedrawer UseEffect");
    // console.log(props.activeEvent);
    currentUser().then((user) => {
      if (user === null) return;
      handleGetEventsForUser(user.attributes.username).then((arr) => {
        setEventNames(arr);
      });
    });

    // eslint-disable-next-line
  }, [props.newEntry]);

  function toggleNewEntry() {
    props.toggleNewEntry();
  }

  async function setActiveEvent(name) {
    if (props.activeEvent !== null) {
      if (name === props.activeEvent.name) {
        props.setActiveEvent(null);
        return;
      }
    }
    let index = null;
    for (let i = 0; i < eventNames.length; i++) {
      if (eventNames[i].name === name) {
        index = i;
      }
    }
    if (index === null) return;
    props.setActiveEvent(eventNames[index]);
  }

  function deleteEvent(id) {
    // console.log(id);
    handleDeleteEvent(id);
    props.setActiveEvent(null);
  }

  function refresh() {
    currentUser().then((user) => {
      handleGetEventsForUser(user.attributes.username).then((arr) => {
        setEventNames(arr);
      });
    });
    // console.log(eventNames);
  }

  return (
    <div className="SideDrawer">
      <div className="Sidedrawer-Button">
        <Button className="ButtonAsH2" onClick={toggleNewEntry}>
          Neues Event
        </Button>
      </div>
      <ul className="u-List">
        {eventNames === null ? (
          <h6>Noch keine Events</h6>
        ) : (
          eventNames.map((e) => (
            <li key={e.name}>
              <Button
                className="ButtonAsH2"
                onClick={() => setActiveEvent(e.name)}
              >
                {e.name}
              </Button>
              <Button className="ButtonAsH2" onClick={() => deleteEvent(e.id)}>
                X
              </Button>
            </li>
          ))
        )}
      </ul>
      <IconButton onClick={refresh} style={{ color: "white" }}>
        <RefreshIcon />
      </IconButton>
    </div>
  );
}

export default Sidedrawer;
