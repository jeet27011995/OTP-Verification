import bcrypt from "bcrypt";
import User from "../models/User.js";

export const Register = async (req, res, next) => {
  try {
    const { username, password, phonenumber, email } = req.body;
    const nameuser = await User.findOne({ email });
    if (nameuser) return res.json({ msg: "User already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      phonenumber,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send({ msg: "User invalid" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.send("password is not valid");

    res.status(200).json({ user, status: true });
  } catch (error) {
    next(error);
  }
};
