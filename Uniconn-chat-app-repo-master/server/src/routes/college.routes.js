import express from "express";
import verifyToken from "../middlewares/verifyJwt.js";
import {
  fetchCollegeswithPagination,
  searchCollege,
} from "../controllers/college.controller.js";

const router = express.Router();

router.get("/search-college", searchCollege);
router.get("/", fetchCollegeswithPagination);

export default router;
