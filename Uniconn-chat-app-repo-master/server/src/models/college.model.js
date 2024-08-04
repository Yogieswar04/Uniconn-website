import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  place: {
    type: String,
    trim: true,
    default: "",
  },
  About: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg",
  },
});

const College = mongoose.model("College", collegeSchema);
export default College;
