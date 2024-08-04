import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    CourseofStream: "",
    Department: "",
    about: "",
    coins: 0,
    college: "",
    email: "",
    name: "",
    password: "",
    phone: "",
    place: "",
    profilePic: "",
  });
  const [errors, setErrors] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/v1/user/find/profile`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch user data");
        console.log(response);
        console.log("data", data);
        setFormData({
          CourseofStream: data.data.CourseofStream,
          Department: data.data.Department,
          about: data.data.about,
          coins: data.coins,
          college: data.data.college.name,
          email: data.data.email,
          name: data.data.name,
          password: "", // Password field should not be editable
          phone: data.data.phone,
          place: data.data.place,
          profilePic: data.data.profilePic,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // navigate("/login"); // Redirect to login if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.CourseofStream)
      newErrors.CourseofStream = "Course of Stream is required";
    if (!formData.Department) newErrors.Department = "Department is required";
    if (!formData.about) newErrors.about = "About is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.place) newErrors.place = "Place is required";
    return newErrors;
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let profilePicUrl = formData.profilePic;
    if (profilePicFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", profilePicFile);
      uploadFormData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );
        const data = await response.json();
        profilePicUrl = data.secure_url;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return;
      }
    }

    try {
      await fetch(`${process.env.VITE_BACKEND_URL}/api/v1/update/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          profilePic: profilePicUrl,
        }),
      });
      setIsEditing(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-purple-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-100">
      <div className="flex items-center justify-between bg-white p-4 w-full shadow-md">
        <img src="/images/Logo.svg" alt="Logo" className="w-24 h-auto" />
        <button className="flex items-center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 21H3v-2.121l13.537-13.537 2.121 2.121L5.121 21zM19.768 6.232l-2.121-2.121 1.415-1.414a1.5 1.5 0 012.121 0l.707.707a1.5 1.5 0 010 2.121l-1.415 1.414z"
            />
          </svg>
          <span>My Account</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 mt-8 w-full max-w-2xl">
        <div className="relative flex justify-center mb-4">
          <img
            src={formData.profilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white -mt-12"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute bottom-0 right-0"
              style={{ opacity: 1 }}
            />
          )}
          <button
            className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full"
            onClick={handleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
              <label className="block mb-2 text-sm font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-2 text-sm font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
              <label className="block mb-2 text-sm font-bold">
                Course of Stream
              </label>
              <input
                type="text"
                name="CourseofStream"
                value={formData.CourseofStream}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.CourseofStream && (
                <span className="text-red-500 text-sm">
                  {errors.CourseofStream}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-2 text-sm font-bold">Department</label>
              <input
                type="text"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.Department && (
                <span className="text-red-500 text-sm">
                  {errors.Department}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
              <label className="block mb-2 text-sm font-bold">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-2 text-sm font-bold">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded bg-gray-100`}
              />
              {errors.place && (
                <span className="text-red-500 text-sm">{errors.place}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className={`w-full p-2 border ${
                isEditing ? "border-gray-300" : "border-transparent"
              } rounded bg-gray-100`}
            />
            {errors.about && (
              <span className="text-red-500 text-sm">{errors.about}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-6 rounded-lg"
            disabled={!isEditing}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
