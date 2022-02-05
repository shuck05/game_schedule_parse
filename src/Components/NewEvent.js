import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { currentUser } from "../parse/LoginAPI";
import "./styles/NewEvent.css";
import { handleCreateNewEvent } from "../parse/EventAPI";

function NewEvent(props) {
  const [eventName, setEventName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [participantArray, setParticipantArray] = useState([]);
  const [trainerArray, setTrainerArray] = useState([]);
  const [newTeamTF, setNewTeamTF] = useState("");
  const [newParticipantTF, setNewParticipantTF] = useState("");
  const [newTrainerTF, setNewTrainerTF] = useState("");

  function handleEventNameChange(e) {
    setEventName(e.target.value);
  }

  function handleNewTeam() {
    for (let i = 0; i < teamArray.length; i++) {
      if (teamArray[i] === newTeamTF) {
        alert("Dieses Team existiert schon");
        return;
      }
    }
    if (newTeamTF === "") {
      alert("Das Team muss einen Namen haben!");
    } else {
      setTeamArray([...teamArray, newTeamTF]);
    }
    setNewTeamTF("");
  }

  function handleNewParticipant() {
    if (participantArray.includes(newParticipantTF)) {
      alert("Diese Teilnehmer existiert schon!");
    } else {
      if (newParticipantTF === "") {
        alert("Der Teilnehmer muss einen Namen haben!");
      } else {
        setParticipantArray([...participantArray, newParticipantTF]);
      }
    }
  }

  function handleNewTrainer() {
    if (trainerArray.includes(newTrainerTF)) {
      alert("Dieser Trainer existiert schon!");
    } else {
      if (newTrainerTF === "") {
        alert("Der Trainer muss einen Namen haben!");
      } else {
        setTrainerArray([...trainerArray, newTrainerTF]);
      }
    }
  }

  function handleTeamnameTextfieldChange(e) {
    setNewTeamTF(e.target.value);
  }
  function handleParticipantTextfieldChange(e) {
    setNewParticipantTF(e.target.value);
  }
  function handleTrainerTextfieldChange(e) {
    setNewTrainerTF(e.target.value);
  }

  function handleDeleteTrainer(trainer) {
    for (var i = 0; i < trainerArray.length; i++) {
      if (trainerArray[i] === trainer) {
        trainerArray.splice(i, 1);
      }
    }
  }

  function handleDeleteTeam(team) {
    for (var i = 0; i < teamArray.length; i++) {
      if (teamArray[i] === team) {
        teamArray.splice(i, 1);
      }
    }
  }

  function handleDeleteparticipant(participant) {
    for (var i = 0; i < participantArray.length; i++) {
      if (participantArray[i] === participant) {
        participantArray.splice(i, 1);
      }
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getGames() {
    if (teamArray.length === 2) {
      return [[teamArray[0], teamArray[1]]];
    } else if (teamArray.length === 3) {
      return [
        [teamArray[0], teamArray[1]],
        [teamArray[1], teamArray[2]],
        [teamArray[2], teamArray[0]],
      ];
    } else {
      let arr = [];
      let count = 0;
      let count2 = 0;
      let entry = [];
      let entryRev = [];
      let matchDoesExist = false;
      let playedMatchBefore = false;

      while (arr.length < (teamArray.length * (teamArray.length - 1)) / 2) {
        count++;
        count2++;
        matchDoesExist = false;
        playedMatchBefore = false;
        let i = getRandomInt(teamArray.length);
        let j = getRandomInt(teamArray.length);
        if (i === j) continue;
        entry = teamArray[i] + teamArray[j];
        entryRev = teamArray[j] + teamArray[i];
        for (let k = 0; k < arr.length; k++) {
          if (arr[k][0] + arr[k][1] === entry) matchDoesExist = true;
          if (arr[k][0] + arr[k][1] === entryRev) matchDoesExist = true;
        }

        if (arr[arr.length - 1] !== undefined) {
          if (
            teamArray[i] === arr[arr.length - 1][0] ||
            teamArray[i] === arr[arr.length - 1][1]
          ) {
            playedMatchBefore = true;
          }

          if (
            teamArray[j] === arr[arr.length - 1][0] ||
            teamArray[j] === arr[arr.length - 1][1]
          ) {
            playedMatchBefore = true;
          }
        }
        if (!matchDoesExist && !playedMatchBefore) {
          // console.log("Added Normally");
          arr.push([teamArray[i], teamArray[j]]);
          count2 = 0;
        } else if (!matchDoesExist && playedMatchBefore && count2 > 300) {
          // console.log("Sadly someone has a double game...");
          arr.push([teamArray[i], teamArray[j]]);
        }
        if (count > 100000) {
          alert("There are games missing");
          break;
        }
      }
      return arr;
    }
  }

  async function createEvent() {
    let user = null;
    await currentUser().then((res) => (user = res.attributes.username));
    const arr = getGames();
    let games = [];
    for (let i = 0; i < arr.length; i++) {
      games.push({
        team1: arr[i][0],
        team2: arr[i][1],
        scoreT1: 0,
        scoreT2: 0,
        done: false,
      });
    }
    let teams = [];
    for (let i = 0; i < teamArray.length; i++) {
      teams.push({
        name: teamArray[i],
        score: 0,
        dif: 0,
        playedGames: 0,
      });
    }

    let ev = {
      name: eventName,
      teams: teams,
      games: games,
      participants: [...participantArray, user],
    };
    handleCreateNewEvent(ev).then((res) => {
      // console.log(res.id);
    });
    props.setNewEntry();
  }

  return (
    <div className="NewEventOuter">
      <div className="Flex-Row" style={{ paddingRight: "2vw" }}>
        <h1 className="Flex-grow">Neues Event erstellen</h1>
        <Button
          variant="outlined"
          onClick={() => {
            createEvent();
          }}
        >
          Event Erstellen
        </Button>
      </div>

      <div className="Flex-Row">
        <div className="Flex-Col">
          <TextField
            className="textfield Col-Content"
            id="0"
            label="Eventname"
            variant="standard"
            onChange={handleEventNameChange}
          />
          <div className="Flex-Row Flex-start">
            <TextField
              className="textfield Col-Content"
              id="0"
              label="Teamname"
              variant="standard"
              value={newTeamTF}
              onChange={handleTeamnameTextfieldChange}
            />
            <Button
              className="Col-Content"
              variant="outlined"
              onClick={() => {
                handleNewTeam();
              }}
            >
              Team Speichern
            </Button>
          </div>

          <div className="Flex-Row Flex-start">
            <TextField
              className="textfield Col-Content"
              id="0"
              label="Teilnehmer hinzufügen"
              variant="standard"
              onChange={handleParticipantTextfieldChange}
            />
            <Button
              className="Col-Content"
              variant="outlined"
              onClick={() => {
                handleNewParticipant();
              }}
            >
              Teilnehmer Speichern
            </Button>
          </div>
          <div className="Flex-Row Flex-start">
            <TextField
              className="textfield Col-Content"
              id="0"
              label="Trainer hinzufügen"
              variant="standard"
              onChange={handleTrainerTextfieldChange}
            />
            <Button
              className="Col-Content"
              variant="outlined"
              onClick={() => {
                handleNewTrainer();
              }}
            >
              Trainer Speichern
            </Button>
          </div>
          <h3>Trainer</h3>
          <ul className="u-List">
            {trainerArray.map((trainer) => (
              <li key={trainer}>
                <TextField
                  className="textfield Col-Content"
                  id="0"
                  label={trainer}
                  variant="standard"
                />
                <Button
                  className="Col-Content"
                  variant="outlined"
                  onClick={() => {
                    handleDeleteTrainer(trainer);
                  }}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="Flex-Col">
          <h3>Teams</h3>
          <ul className="u-List">
            {teamArray.map((team) => (
              <li key={team}>
                <TextField
                  className="textfield Col-Content"
                  id="0"
                  label={team}
                  variant="standard"
                />
                <Button
                  className="Col-Content"
                  variant="outlined"
                  onClick={() => {
                    handleDeleteTeam(team);
                  }}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>

          <h3>Teilnehmer</h3>
          <ul className="u-List">
            {participantArray.map((participant) => (
              <li key={participant}>
                <TextField
                  className="textfield Col-Content"
                  id="0"
                  label={participant}
                  variant="standard"
                />
                <Button
                  className="Col-Content"
                  variant="outlined"
                  onClick={() => {
                    handleDeleteparticipant(participant);
                  }}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewEvent;
