// import mongoose from "mongoose";

// const courseOfStreamEnum = ["B.Tech", "M.Tech", "MBA", "B.Sc", "M.Sc", "PhD"];

// const departmentEnum = [
//   "CSE",
//   "ECE",
//   "EEE",
//   "ME",
//   "CE",
//   "IT",
//   "Biotech",
//   "Chemical Engineering",
//   "Aeronautical Engineering",
//   "Automobile Engineering",
//   "Industrial Engineering",
//   "Instrumentation Engineering",
//   "Metallurgical Engineering",
//   "Mining Engineering",
//   "Production Engineering",
//   "Finance",
//   "Marketing",
//   "HR",
//   "Operations Management",
//   "International Business",
//   "Healthcare Management",
//   "Entrepreneurship",
//   "Business Analytics",
//   "Supply Chain Management",
//   "Rural Management",
//   "Physics",
//   "Chemistry",
//   "Mathematics",
//   "Biology",
//   "Environmental Science",
//   "Zoology",
//   "Botany",
//   "Statistics",
//   "Economics",
//   "Psychology",
//   "Sociology",
//   "History",
//   "Political Science",
// ];

// const educationSchema = new mongoose.Schema({
//   College: {
//     type: mongoose.schema.Types.ObjectId,
//     required: true,
//   },
//   Department: {
//     type: String,
//     required: true,
//     enum: departmentEnum,
//   },
//   CourseOfStream: {
//     type: String,
//     required: true,
//     enum: courseOfStreamEnum,
//   },
// });

// const Education = mongoose.model("Education", educationSchema);
// export default Education;
