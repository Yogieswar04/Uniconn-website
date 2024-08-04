import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import College from "../models/college.model.js";

export const fetchUserChatsforSideBar = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .populate({
        path: "participants",
        match: { _id: { $ne: userId } }, // Exclude the current user from participants
        select: "name profilePic", // Select only the name of the participant
      })
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "name", // Select the name of the sender
        },
      });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchUsersWithPagination = async (req, res) => {
  try {
    const { page = 0, limit = 2 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const users = await User.find()
      .skip(pageNumber * limitNumber)
      .limit(limitNumber)
      .exec();
    const TotalCount = await User.countDocuments();
    const currentPage = page * limit;
    res.status(200).json({ users, TotalCount });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const fetchMentorsByCollegeName = async (req, res) => {
  try {
    const { page = 0, limit = 2 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const college = req.params.id.trim();
    const re = new RegExp(`^${college}$`, "i");

    const CollegeId = await College.findOne({ name: { $regex: re } }).select(
      "_id"
    );

    if (!CollegeId) {
      return res.status(404).json({ message: "College not found", data: [] });
    }

    const totalCount = await User.countDocuments({ college: CollegeId });
    const mentors = await User.find({ college: CollegeId })
      .skip(pageNumber * limitNumber)
      .limit(limitNumber)
      .select("-password -refreshToken");

    const currentPage = pageNumber;

    if (mentors.length === 0) {
      return res.status(200).json({ message: "No mentors present", data: [] });
    }

    res.status(200).json({
      data: mentors,
      totalCount,
      currentPage,
      totalPages: Math.ceil(totalCount / limitNumber),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const fetchUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(`^${name}`, "i");
    const user = await User.find({ name: { $regex: regex } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    return res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const fetchUserByCollegeName = async (req, res) => {
  try {
    const { page = 0, limit = 2 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const college = req.params.id;
    const re = new RegExp(`^${college}`, "i");
    const CollegeId = await College.findOne({ name: { $regex: re } }).select(
      "_id"
    );
    if (!CollegeId) {
      return res.status(404).json({ message: "College not found", data: [] });
    }
    const totalCount = await User.countDocuments({ college: CollegeId });
    const mentors = await User.find({ college: CollegeId })
      .skip(pageNumber * limitNumber)
      .limit(limitNumber)
      .select("-password -refreshToken");
    const currentPage = pageNumber;
    if (mentors.length === 0) {
      return res.status(200).json({ message: "No mentors present", data: [] });
    }
    res.status(200).json({
      data: mentors,
      totalCount,
      currentPage,
      totalPages: Math.ceil(totalCount / limitNumber),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//GET SPECIFIC USER DETAILS
export const fetchUserDetailsById = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id)
      .select("-password -refreshToken")
      .populate("college");
    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }
    res.status(200).json({ message: "User found", data: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const fetchUserDetailsByIdForChatsByParam = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password -refreshToken")
      .populate("college");
    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }
    res.status(200).json({ message: "User found", data: user });
  } catch (err) {
    res.status(500).json(err);
  }
};
