import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import Message from "./Message";
import Arrow from "./Arrow";

const Main = ({ room }) => {
  const [message, setMessage] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const lastMsgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const collectionRef = collection(db, "messages");

    //sorgu ayarları
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createAt", "asc")
    );

    // anlık veri akışı
    const unsub = onSnapshot(q, (data) => {
      const temp = [];

      data.docs.forEach((element) => {
        temp.push(element.data());
      });

      setMessage(temp);
    });

    return () => unsub();
  }, []);

  //yeni mesaj gelince odaklan
  useEffect(() => {
    if (message.length > 0) {
      const lastMsg = message[message.length - 1];

      if (lastMsg.author.id === auth.currentUser.uid) {
        //son mesajı oturumu açık kullanıcı atıysa her koşulda aşağı kaydır
        scrollToBottom();
      } else if (isAtBottom) {
        //son mesajı farklı kullanıcı attıysa isAtBottom true ise aşağı kaydır
        scrollToBottom();
      }
    }
  }, [message]);
  const scrollToBottom = () => {
    lastMsgRef.current.scrollIntoView();
  };

  //scrool konumu
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 200);
  };

  return (
    <main
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 relative p-3 flex flex-col gap-3 w-full overflow-y-auto"
    >
      {message.length < 1 ? (
        <div className="h-full grid place-items-center  text-zinc-400">
          <p>Send the first message in the chat</p>
        </div>
      ) : (
        message.map((item, i) => <Message key={i} data={item} />)
      )}
      <div ref={lastMsgRef} />
      <Arrow isAtBottom={isAtBottom} handleScroll={scrollToBottom} />
    </main>
  );
};

export default Main;
