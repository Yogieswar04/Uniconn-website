import College from "../models/college.model.js";

export const searchCollege = async (req, res) => {
  try {
    const college = req.query?.search;
    const regex = new RegExp(college, "i");
    const colleges = await College.find({ name: { $regex: regex } }).exec();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createcollege = async (req, res) => {
  try {
    const name = req.body.name;
    const place = req.body.place;
    const Department = req.body.Department;
    const CourseofStream = req.body.CourseofStream;
    const college = new College({
      name,
      place,
      Department,
      CourseofStream,
    });
    const savedCollege = await college.save();
    res.status(200).json({ message: "college created", savedCollege });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const fetchCollegeswithPagination = async (req, res) => {
  try {
    const { page = 0, limit = 2 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const colleges = await College.find()
      .skip(pageNumber * limitNumber)
      .limit(limitNumber)
      .exec();
    const TotalCount = await College.countDocuments();
    const currentPage = page * limit;
    res.status(200).json({ colleges, TotalCount });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
