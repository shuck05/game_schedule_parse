// import { useState } from "react";
import "./styles/MainSpace.css";
import Scoreboard from "./Scoreboard";
import Schedule from "./Schedule";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../parse/LoginAPI";

function MainSpace(props) {
  const [renderMain, setRenderMain] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    currentUser().then((user) => {
      if (user !== null) return;
      nav("/login");
    });
  });

  return (
    <div>
      {props.activeEvent === null ? (
        <div className="NewEventOuter">
          <div className="Flex-Row" style={{ paddingRight: "2vw" }}>
            <h1 className="Flex-grow">Kein Event ausgewählt</h1>
          </div>
        </div>
      ) : (
        <div className="NewEventOuter">
          <div>
            <h1 className="Flex-grow" style={{ paddingBottom: "2vw" }}>
              {props.activeEvent.name}{" "}
            </h1>
            <Scoreboard activeEvent={props.activeEvent}></Scoreboard>
            <div style={{ paddingBottom: "4vw" }}>
              <Schedule
                activeEvent={props.activeEvent}
                setActiveEvent={props.setActiveEvent}
              ></Schedule>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSpace;
