import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: "",
      required: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    CourseofStream: {
      type: String,
      required: true,
      trim: true,
    },
    Department: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    coins: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
