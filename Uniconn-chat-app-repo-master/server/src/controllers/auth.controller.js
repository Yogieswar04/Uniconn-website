import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import College from "../models/college.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const college = req.body.college.trim();
    const re = new RegExp(`^${college}$`, "i");
    const existedCollege = await College.findOne({
      name: { $regex: re },
    });
    let collegeId;
    if (existedCollege) {
      collegeId = existedCollege._id;
    } else {
      const college = new College({
        name: req.body.college,
      });
      await college.save();
      collegeId = college._id;
    }

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      place: req.body.place,
      phone: req.body.phone,
      college: collegeId,
      Department: req.body.Department,
      CourseofStream: req.body.CourseOfStream,
      about: req.body.about,
      profilePic: req.body.profilePic || undefined,
    });
    const saveduser = await user.save();

    // Select fields to send in response
    const responseUser = await User.findById(saveduser._id).select(
      "-password -refreshToken"
    );

    if (!saveduser)
      return res.status(400).send("the user cannot be created !!!");

    res.status(200).json({
      success: true,
      data: responseUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please provide Credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No user Found!!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid User Credentials",
      });
    }
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        data: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in Successfully!!",
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User Logged out Successfully" });
};
