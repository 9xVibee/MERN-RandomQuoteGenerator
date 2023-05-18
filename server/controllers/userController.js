import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// https://api.quotable.io/random

export const signUp = async (req, res) => {
  const { name, email } = req.body;

  //   check if email already exists
  const emailAlreadyExits = await User.findOne({ email });
  if (emailAlreadyExits) {
    return res.json({
      error: "Email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const { password, ...otherData } = newUser._doc;

  const token = jwt.sign({ id: newUser._id }, process.env.JWT);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(200)
    .json("Successfully Sing up");
};

// sign in
export const SingIn = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      error: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.json({
      error: "Wrong password",
    });
  }

  const { password, ...otherData } = user._doc;
  const token = jwt.sign({ id: user._id }, process.env.JWT);

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(200)
    .json("Succesfully login");
};

// get my profile
export const getMyProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.json({
        error: "Login first",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedData.id);

    res.json(user).status(200);
  } catch (error) {
    console.log(error);
  }
};

// logout
export const logout = (req, res) => {
  res.cookie("token", "").json({
    success: true,
    user: req.user,
  });
};
