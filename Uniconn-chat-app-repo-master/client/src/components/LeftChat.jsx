import React from "react";

const LeftChat = ({ name, lastMessage, onClick, pic, isOnline }) => {
  return (
    <div
      className="flex flex-row h-20 gap-1 mt-4 rounded-md shadow-md border border-1 border-gray-300 w-full cursor-pointer bg-white hover:bg-green-100"
      onClick={onClick}
    >
      <div className="w-[20%] relative flex justify-center items-center p-2">
        <img src={pic} className="rounded-[50%] w-full h-full object-cover " />
        {isOnline && (
          <div
            className={`badge badge-success badge-xs absolute right-3 bottom-2`}
          ></div>
        )}
      </div>
      <div className="flex flex-col justify-evenly w-[70%] ">
        <div className="flex flex-row font-bold text-black md:text-xl sm:text-xl">
          {name}
        </div>
        <div className="flex flex-row flex-nowrap overflow-hidden h-6 font-medium">
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

export default LeftChat;
