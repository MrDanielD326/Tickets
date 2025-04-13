const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { exportTaskReport, exportUsersReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTaskReport);  // Export all tasks as Excel or PDF
router.get("/export/users", protect, adminOnly, exportUsersReport);  // Export user-task report

module.exports = router;
