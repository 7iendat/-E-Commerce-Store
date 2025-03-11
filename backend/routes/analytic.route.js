import express from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytic.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);
    return res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("error in analyticRoutes", error.message);
    return res
      .status(500)
      .json({ message: "Server error something", error: error.message });
  }
});

export default router;
