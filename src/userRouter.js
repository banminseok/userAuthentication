import express from "express";
import { getJoin, postJoin, home } from "./userController"
const userRouter = express.Router();

// Add your magic here!
userRouter.get("/", home);
userRouter.route("/join").get(getJoin).post(postJoin);

export default userRouter;
