import React from "react";
import { useNavigate } from "react-router-dom";

const NoCollegeFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-full">
      <div className="h-[50%] w-full relative md:pl-[5rem]">
        <div className="image absolute h-full vsm:w-[17rem] lg:w-[25rem] lg:h-[60vh]">
          <img
            src="/images/message.png"
            alt="message"
            className="p-2 w-full h-full"
          />
        </div>
        <div className="flex flex-wrap w-[12rem] absolute vsm:left-[2rem] vsm:top-[5rem] md:top-[5rem] md:left-[8rem] vsm:text-[1rem] md:text-xl font-bold">
          Uh-Oh!!! Sorry, No mentors available for this university.
        </div>
      </div>
      <div className="h-[50%] flex vsm:flex-row-reverse md:flex-row justify-center vsm:gap-2 vsm:p-2 md:p-0 md:gap-10">
        <div className="h-full">
          <img src="/images/collegenotfoundpic.png" className="h-full" />
        </div>
        <div
          className="bg-[#9979f8] vsm:px-2 md:px-[3rem] mt-[10rem] h-[3rem] flex flex-row justify-center items-center font-medium rounded-xl text-white hover:bg-[#7e57f3] cursor-pointer hover:shadow-md hover:shadow-black"
          onClick={() => navigate("/mentor/request")}
        >
          Request Mentor
        </div>
      </div>
    </div>
  );
};
1;
export default NoCollegeFound;
