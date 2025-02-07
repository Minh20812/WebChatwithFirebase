import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import Loader from "./components/Loader";

const App = () => {
  const [user, setUser] = useState(undefined);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    //Everytime the user sign in, it brings their current informations
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    //stop tracking when user leaves the page
    return () => unSub();
  }, []);
  // if user data has not been loaded
  if (user === undefined) {
    return <Loader />;
  }
  // If user has not logged in
  if (user === null) return <LoginPage />;

  if (room) return <ChatPage room={room} setRoom={setRoom} />;

  return <RoomPage setRoom={setRoom} />;
};

export default App;
