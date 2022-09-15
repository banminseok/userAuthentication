/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";

// Add your magic here!

/**
 * Join , Get page - 회원등록
 */
export const getJoin = (req, res) => {
  res.send("join");
}
/**
 * Join : 회원등록 저장 - 입력된 정보 DB 저장.
 */
export const postJoin = (req, res) => {
  res.send("postJoin");
}

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
}