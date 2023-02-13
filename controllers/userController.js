import { initClient } from "messagebird";
const messagebird = initClient(process.env.key);
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSaltSync(10);
          req.body.password = await bcrypt.hashSync(req.body.password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(500).json("User not verified");
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.body.email);
    const { password, ...other } = user._doc;
    res.status(200).send(other);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(500).json("You can delete only your account");
    }
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { phonenumber } = req.body;
  const newPhonenumber = "+91" + phonenumber;
  var params = {
    template: "Your forget password otp %token",
    timeout: 300,
  };

  messagebird.verify.create(newPhonenumber, params, (err, response) => {
    if (err) {
      console.log(err, response);
      res.status(400).send({ status: "failed", message: "Unable to Send OTP" });
    } else {
      res.status(200).send({
        status: "success",
        message: "OTP Send Successfully",
      });
    }
  });
};

export const verifyOtp = async (req, res, next) => {
  const { id, otpcode } = req.body;
  messagebird.verify.verify(id, otpcode, (err, response) => {
    if (err) {
      // Incorrect OTP
      console.log("OTP Verification Error:", err);
      res.status(200).send({ status: "failed", message: "Invalid OTP" });
    } else {
      console.log("OTP Verification Response:", response);
      res.status(200).send({ status: "success", message: "Login Success" });
    }
  });
};
