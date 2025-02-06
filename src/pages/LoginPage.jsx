import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log("giriş hatası", err);
      });
  };
  return (
    <div className="wrapper">
      <div className="box  h-[50vh]  flex flex-col justify-center items-center gap-[50px] ">
        <h1 className="text-4xl font-bold">Chat Odası</h1>
        <p className="text-gray-400">Devam Etmek için Giriş Yapın</p>
        <button
          onClick={handleLogin}
          className="flex gap-5 items-center p-2 px-4 rounded-md shadow-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
        >
          <img src="/google.png" alt="google" className="w-[30px]" />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
