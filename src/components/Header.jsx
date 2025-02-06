import React from "react";
import { auth } from "../firebase";
const Header = ({ room, setRoom }) => {
  return (
    <header className="flex justify-between items-center border border-gray-200 shadow-lg p-5">
      <p>{auth.currentUser.displayName}</p>
      <p className="font-semibold">{room}</p>
      <button onClick={() => setRoom(null)} className="btn">
        Farklı Oda
      </button>
    </header>
  );
};

export default Header;
