// Home.js
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import CollegeCard from "../../components/CollegeCard";
import Navbar from "../../components/Navbar";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Home = () => {
  const [mentorpage, setMentorPage] = useState(0);
  const [mentorlimit, setMentorLimit] = useState(5);
  const [collegepage, setCollegePage] = useState(0);
  const [collegelimit, setCollegeLimit] = useState(5);
  const [mentors, setMentors] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [mentorLoading, setMentorLoading] = useState(false);
  const [collegeLoading, setCollegeLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setMentorLoading(true);
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/v1/user?page=${mentorpage}&limit=${mentorlimit}`
        );
        const data = await res.json();
        setMentorLoading(false);
        setMentors(data.users);
      } catch (er) {
        setMentorLoading(false);
        console.log(er);
      } finally {
        setMentorLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        setCollegeLoading(true);
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/v1/colleges?page=${collegepage}&limit=${collegelimit}`
        );
        const data = await res.json();
        setCollegeLoading(false);
        setColleges(data.colleges);
      } catch (er) {
        setCollegeLoading(false);
        console.log(er);
      } finally {
        setCollegeLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-3 no-scrollbar scroll-smooth">
      <Navbar />
      <div className="relative flex h-screen justify-center items-center -mt-3 bg-cover bg-center">
        <img
          src="https://as1.ftcdn.net/v2/jpg/04/34/08/56/1000_F_434085662_Pd3yWP81H8d7kGW5Z1J3SfSfvMgGsth7.jpg"
          alt="background"
          className=" inset-0 w-full h-full object-cover opacity-[1]"
        />
        <div className="absolute z-10 text-7xl top-[10rem] font-bold text-center text-white">
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Connecting Students...")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Welcomes You")
                .start();
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-2">
          <div className="flex text-black text-2xl md:text-3xl  font-bold">
            Talk to our Community
          </div>
          <Link to="/mentors">
            <div className="flex underline text-black text-2xl">See all</div>
          </Link>
        </div>
        {mentorLoading ? (
          <div className="flex w-52 flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        ) : (
          <div className="flex w-full p-4 overflow-x-scroll no-scrollbar">
            <div className="flex gap-5">
              {mentors.map((mentor) => (
                <Card
                  key={mentor._id}
                  image={mentor.profilePic}
                  name={mentor.name}
                  CourseOfStream={mentor.CourseofStream}
                  Department={mentor.Department}
                  place={mentor.place}
                  about={mentor.about.substring(0, 100)}
                  mentorId={mentor._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between p-2">
          <div className="flex text-black text-2xl md:text-3xl font-bold">
            Explore Colleges
          </div>
          <Link to="/colleges">
            <div className="flex underline text-black text-2xl">See all</div>
          </Link>
        </div>
        {collegeLoading ? (
          <div className="skeleton h-32 w-32"></div>
        ) : (
          <div className="flex w-full p-4 overflow-x-scroll no-scrollbar">
            <div className="flex gap-10">
              {colleges.map((college) => (
                <CollegeCard
                  key={college._id}
                  name={college.name}
                  place={college.place}
                  image={college.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
