import express from "express";
import {createUser, getAllUser, loginUserCtrl,getSingleUser, deleteUser, updateAUser } from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register",createUser);
userRouter.post("/login",loginUserCtrl);
userRouter.get("/all-users",getAllUser);
userRouter.get("/:id",authMiddleware,getSingleUser);
userRouter.delete("/:id",deleteUser);
userRouter.patch("/:id",updateAUser);




export default userRouter;