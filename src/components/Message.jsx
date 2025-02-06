import { auth } from "../firebase";
import generateUserColor from "../utils/generateUserColor";

const Message = ({ data }) => {
  //eğer mesajı şuan oturumu açık olan kullanıcı ise
  if (data.author.id === auth.currentUser.uid) {
    return (
      <p className="message bg-black text-white rounded-[7px_7px_0_7px] self-end">
        {data.text}
      </p>
    );
  }
  //! mesajı farklı kullanıcı atarsa
  return (
    <div className="flex items-center gap-1">
      <img
        src={data.author.photo}
        alt="photo"
        className="size-[40px] rounded-full"
      />
      <div className="flex flex-col gap-1 w-full">
        <span
          className="font-bold whitespace-nowrap text-zinc-700"
          style={{ color: generateUserColor(data.author) }}
        >
          {data.author.name}
        </span>
        <p className="message text-zinc-800 bg-zinc-200 rounded-[0_7px_7px_7px]">
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
