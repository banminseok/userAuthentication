import express from "express";
import { getJoin, postJoin, home, getLogin, postLogin, logout } from "./userController"
import { protectorMiddleware, publicOnlyMiddleware } from "./middlewares";
const userRouter = express.Router();

// Add your magic here!
userRouter.get("/", protectorMiddleware, home);
userRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
userRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
userRouter.get("/logout", protectorMiddleware, logout);

export default userRouter;
