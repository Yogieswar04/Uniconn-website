import express from "express";
import {
  fetchAllUsers,
  fetchMentorsByCollegeName,
  fetchUserByCollegeName,
  fetchUserByName,
  fetchUserChatsforSideBar,
  fetchUserDetailsById,
  fetchUserDetailsByIdForChatsByParam,
  fetchUsersWithPagination,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyJwt.js";

const router = express.Router();
router.get("/", fetchUsersWithPagination);
router.get("/chat", verifyToken, fetchUserChatsforSideBar);
router.get("/search/:name", fetchUserByName);
router.get("/sample", fetchAllUsers);
router.get("/find/profile", verifyToken, fetchUserDetailsById);
router.get("/:id", fetchUserDetailsByIdForChatsByParam);
router.get("/get/:id", fetchMentorsByCollegeName);

export default router;
