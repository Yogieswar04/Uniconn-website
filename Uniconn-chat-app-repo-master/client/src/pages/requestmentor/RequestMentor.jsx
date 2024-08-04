import React, { useState } from "react";
import { Link } from "react-router-dom";

const RequestMentor = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    college: "",
    department: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/v1/user/request-mentor`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-purple-100 p-6">
        <h2 className="text-3xl font-bold mb-6">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your request has been submitted. We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between bg-white shadow-md p-4">
        <div className="flex items-center space-x-4">
          <button className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/">
            <img src="/images/Logo.svg" alt="Logo" />
          </Link>
        </div>
        <button className="bg-purple-500 text-white py-2 px-4 rounded-lg">
          Contact Us
        </button>
      </nav>
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center bg-purple-100 p-6">
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 m-4 w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-6 text-center">
            REQUEST A MENTOR
          </h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-bold">Name*</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">Password*</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12h.01M12 12h.01M9 12h.01M9 12a3.75 3.75 0 00-7.5 0 3.75 3.75 0 007.5 0zm9 0a3.75 3.75 0 00-7.5 0 3.75 3.75 0 007.5 0zM12 9v.01M12 12v.01M12 15v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">
                College you want mentor from*
              </label>
              <input
                type="text"
                name="college"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="College"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">
                Department*
              </label>
              <input
                type="text"
                name="department"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">Message</label>
              <textarea
                name="message"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg"
            >
              Request
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-2/3 text-center p-4 md:p-10">
          <h2 className="text-3xl font-bold mb-2">Didn't Find Your Mentor?</h2>
          <p className="text-gray-600 mb-6">We are working on it.</p>
          <div className="w-full flex justify-center">
            <img
              src="/images/ladder request mentor pic.png"
              alt="No mentors found"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestMentor;
