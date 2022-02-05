import Parse from "./index";

const handleCreateNewEvent = async (event) => {
  const res = await Parse.Cloud.run("createEvent", event);
  return res;
};

const handleGetEventsForUser = async (username) => {
  const res = await Parse.Cloud.run("getEventsForUser", { username: username });
  return res;
};

const handleDeleteEvent = async (id) => {
  const res = await Parse.Cloud.run("deleteEvent", { id: id });
  return res;
};

const handleNewResult = async (game, eventID) => {
  const res = await Parse.Cloud.run("addResult", { game: game, id: eventID });
  return res;
};

const handleUpdateResult = async (game, eventID) => {
  console.log("updating is much more complicated...");
};

export {
  handleCreateNewEvent,
  handleGetEventsForUser,
  handleDeleteEvent,
  handleNewResult,
  handleUpdateResult,
};
