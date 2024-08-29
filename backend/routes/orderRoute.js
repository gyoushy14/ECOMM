import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders_Admin, placeHolder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeHolder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders_Admin);
orderRouter.post("/status", updateStatus);

export default orderRouter ;