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
    //kullanıcı oturumu her değiştiğinde güncel bilgilerini getirir
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    //kullanıcı sayfadan ayrılınca izlemeyi durdur
    return () => unSub();
  }, []);
  //kullanıcı verisi yüklenmediyse
  if (user === undefined) {
    return <Loader />;
  }
  // oturum açılmadıysa
  if (user === null) return <LoginPage />;

  if (room) return <ChatPage room={room} setRoom={setRoom} />;

  return <RoomPage setRoom={setRoom} />;
};

export default App;
