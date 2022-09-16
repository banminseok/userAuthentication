/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from "bcrypt";

// Add your magic here!

/**
 * Join , Get page - 회원등록
 */
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
}
/**
 * Join : 회원등록 저장 - 입력된 정보 DB 저장.
 */
export const postJoin = async (req, res) => {
  const { username, name, password, password2 } = req.body;
  const userExists = await User.findOne({ username });
  const pageTitle = "Join";
  if (userExists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "username already taken(이미 사용 중인 사용자이름입니다.)" })
  }
  if (password !== password2) {
    return res.status(400).render("join", { pageTitle, errorMessage: "wrong password confirmation(비밀번호가 일치하지 않습니다.)" });
  }
  if (!name) {
    return res.status(400).render("join", { pageTitle, errorMessage: "Please enter your name." })
  }
  try {
    await User.create({
      name, username, password
    });
    //const userList = await User.find({});
    //console.log("💗userList➡", userList);
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", { pageTitle, errorMessage: error._message })
  }
  res.send("postJoin");
}
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
}
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  if (!username) {
    return res.status(400).render("login", { pageTitle, errorMessage: "Please enter username." })
  }
  if (!password) {
    return res.status(400).render("login", { pageTitle, errorMessage: "Please enter password." })
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username dose not exists." })
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage: "wrong password(비밀번호가 틀렸습니다.)" });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
}

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};