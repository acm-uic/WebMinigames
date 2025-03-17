import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, CLOUDINARY_CONFIG } from "../config.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(CLOUDINARY_CONFIG);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserControllers = {
  createUser: async (req, res) => {
    try {
      // Get the info from the user
      const { userName, email, password, bio } = req.body;
      const avatar = req.file;
      // Check if there's any email alr existed
      const existedUser = await UserModel.findOne({
        email: email,
      });

      //   If alr exists an email,
      if (existedUser)
        throw new Error("Email existed! Please enter a different email.");
      // Create a hash password
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      //   Create a new user
      const newUser = await UserModel.create({
        userName,
        email,
        password: hashedPassword,
        avatar,
        bio,
      }).select("-password");

      res.status(201).send({
        message: "User created successfully",
        success: true,
        data: newUser,
      });
    } catch (error) {
      res.status(409).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  signinUser: async (req, res) => {
    try {
      // Get the info from the user
      const { email, password } = req.body;

      // Check if user exist
      const crrUser = await UserModel.findOne({
        email: email,
      });

      // If does not exist user
      if (!crrUser)
        throw new Error("Account does not exist! Please re-enter your email!");

      // Check whether the password is correct or not
      const comparePassword = bcrypt.compareSync(password, crrUser.password);
      if (!comparePassword)
        throw new Error(
          "Wrong password entered! Please re-enter your password!"
        );

      const user = {
        _id: crrUser._id,
        email: crrUser.email,
      };

      const token = jwt.sign(user, SECRET_KEY, { expiresIn: 60 * 60 });

      res.status(200).send({
        message: "User signs in successfully",
        success: true,
        data: token,
      });
    } catch (error) {
      res.status(409).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { user } = req;
      const { userName, email, password, avatar, bio } = req.body;

      // If the user doesn't update anything
      if (!(userName || email || password || avatar || bio))
        throw new Error("Please enter an updated field!");
      // Get the crrUser
      const crrUser = await UserModel.findById(user._id);

      const updatedFields = {};

      // Check and update only changed fields
      if (userName && String(userName) !== String(crrUser.userName)) {
        updatedFields.userName = userName;
      }
      if (email && String(email) !== String(crrUser.email)) {
        updatedFields.email = email;
      }
      if (avatar && String(avatar) !== String(crrUser.avatar)) {
        updatedFields.avatar = avatar;
      }
      if (bio && String(bio) !== String(crrUser.bio)) {
        updatedFields.bio = bio;
      }
      // If the password is new, create a new hashedPassword
      if (password) {
        const comparePassword = bcrypt.compareSync(password, crrUser.password);
        if (!comparePassword) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          updatedFields.password = bcrypt.hashSync(password, salt);
        }
      }

      // Update the only changed fields
      const updatedProfile = await UserModel.findByIdAndUpdate(
        user._id,
        { $set: updatedFields },
        { new: true }
      ).select("-password");

      res.status(200).send({
        message: "Profile updated successfully!",
        success: true,
        data: updatedProfile,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
};

export default UserControllers;
