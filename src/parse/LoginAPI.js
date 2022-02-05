import Parse from "./index";

const login = async (email, password) => {
  const user = await Parse.User.logIn(email, password).catch((err) => {
    alert("Invalid Username or Password");
  });
  if (user === undefined) return null;
  return user;
};

const signUp = async (username, password) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  try {
    await user.signUp();
    const param = {
      username: username,
      password: password,
    };
    await Parse.Cloud.run("createUser", param);
    /*
    const Users = Parse.Object.extend("Users");
    const u = new Users();
    u.save({ username: username, events: [] });
  */
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
};

const logout = async () => {
  Parse.User.logOut();
};

const currentUser = async () => {
  const currentUser = await Parse.User.current();
  return currentUser;
};

const addEventToUser = async (eventID, UserID) => {
  const Users = Parse.Object.extend("Users");
  const query = new Parse.Query(Users);
  query.get("eventID").then(
    (event) => {
      // The object was retrieved successfully.
      let events;
    },
    (error) => {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    }
  );
};

export { login, signUp, logout, currentUser, addEventToUser };
