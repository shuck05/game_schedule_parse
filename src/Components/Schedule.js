import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./styles/Schedule.css";
import { useState, useEffect } from "react";
import { handleNewResult, handleUpdateResult } from "../parse/EventAPI";

function Schedule(props) {
  const [activeEdit, setActiveEdit] = useState("");
  const [textfield1, setTextfield1] = useState(0);
  const [textfield2, setTextfield2] = useState(0);

  function handleTF1change(e) {
    setTextfield1(e.target.value);
  }

  function handleTF2change(e) {
    setTextfield2(e.target.value);
  }

  function comp(team1, team2) {
    if (team1.score > team2.score) return -1;
    if (team1.score < team2.score) return 1;
    if (team1.dif > team2.dif) return -1;
    if (team1.dif < team2.dif) return 1;
    return 0;
  }

  async function addResult(team1, team2) {
    let doneBefore = false;
    for (let i = 0; i < props.activeEvent.games.length; i++) {
      if (
        props.activeEvent.games[i].team1 !== team1 ||
        props.activeEvent.games[i].team2 !== team2
      )
        continue;
      doneBefore = props.activeEvent.games[i].done;
    }
    let newGame = {
      team1: team1,
      team2: team2,
      scoreT1: textfield1,
      scoreT2: textfield2,
      done: true,
    };
    if (!doneBefore) {
      await handleNewResult(newGame, props.activeEvent.id).then((event) => {
        console.log(event);
        event = { ...event, id: props.activeEvent.id };
        event.teams = event.teams.sort(comp);
        props.setActiveEvent(event);
      });
    } else {
      await handleUpdateResult(newGame, props.activeEvent.id);
    }

    setTextfield1(0);
    setTextfield2(0);
    setActiveEdit("");
  }

  return (
    <div>
      <h4>Spielplan</h4>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>Team 1</div>
        <div style={{ width: "30%" }}>Team 2</div>
        <div style={{ width: "15%" }}>Punkte Team 1</div>
        <div style={{ width: "15%" }}>Punkte Team 2</div>
        <div style={{ width: "10%" }}></div>
      </div>

      <ul className="u-List">
        {props.activeEvent.games.map((e) => (
          <li key={e.team1 + e.team2} style={{ display: "flex" }}>
            <div style={{ width: "28%", padding: "1%" }}>{e.team1}</div>
            <div style={{ width: "28%", padding: "1%" }}>{e.team2}</div>

            {!(activeEdit === e.team1 + e.team2) && (
              <div>
                <TextField
                  size="small"
                  value={e.scoreT1}
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <TextField
                  value={e.scoreT2}
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <IconButton onClick={() => setActiveEdit(e.team1 + e.team2)}>
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
            {activeEdit === e.team1 + e.team2 && (
              <div>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF1change}
                ></TextField>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF2change}
                ></TextField>
                <IconButton onClick={() => addResult(e.team1, e.team2)}>
                  <CheckIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
