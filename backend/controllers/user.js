import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, CLOUDINARY_CONFIG } from "../config.js";
import { v2 as cloudinary } from "cloudinary";
import { handleAvatarUpload } from "../utils/avatarHandlers.js";

cloudinary.config(CLOUDINARY_CONFIG);

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
      // Create a payload for creating newUser
      const userPayload = {
        userName,
        email,
        password: hashedPassword,
        bio,
      };
      // Only add avatar if the user upload avatar file
      if (avatar) {
        const response = await handleAvatarUpload(avatar, userPayload);
        if (!response.success) throw new Error(response.message);
      }

      //   Create a new user
      const newUser = await UserModel.create(userPayload);
      // Hide the password when displaying
      newUser.password = undefined;

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
      const { userName, email, bio } = req.body;
      const avatar = req.file;

      // If the user doesn't update anything
      if (!(userName || email || avatar || bio)) {
        throw new Error("Please enter an updated field!");
      }

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
      if (bio && String(bio) !== String(crrUser.bio)) {
        updatedFields.bio = bio;
      }
      if (avatar) {
        // Get the current file "fileName"
        const currentFileName = crrUser.avatar
          ? crrUser.avatar.split("/").pop().split(".")[0]
          : null;
        // Get the new file "fileName"
        const newFileName = avatar.originalname.split(".")[0];

        // If the names are different, replace with the new file
        if (newFileName !== currentFileName) {
          // Proceed with upload
          const response = await handleAvatarUpload(avatar, updatedFields);
          if (!response.success) throw new Error(response.message);
          // Delete the old avatar from Cloudinary
          if (currentFileName) {
            await cloudinary.uploader.destroy(currentFileName);
          }
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
