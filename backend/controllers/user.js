import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import { CLOUDINARY_CONFIG } from "../config.js";
import { v2 as cloudinary } from "cloudinary";
import { handleFileUpload } from "../utils/upload.js";
import { generateToken } from "../utils/token.js";

cloudinary.config(CLOUDINARY_CONFIG);

const UserControllers = {
  createUser: async (req, res) => {
    try {
      // Get the info from the user
      const { userName, email, password, bio, role } = req.body;
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
        role,
      };
      // Only add avatar if the user upload avatar file
      if (avatar) {
        const response = await handleFileUpload(avatar);
        if (!response.success) throw new Error(response.message);
        userPayload.avatar = response.data;
      }

      //   Create a new user
      const newUser = await UserModel.create(userPayload);
      // Hide the password when displaying
      newUser.password = undefined;

      res.status(201).send({
        message: "User created successfully",
        success: true,
        data: { user: newUser },
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
        userName: crrUser.userName,
        role: crrUser.role,
      };

      const accessToken = generateToken(
        {
          ...user,
          typeToken: "AT",
        },
        "AT"
      );

      const refreshToken = generateToken(
        {
          ...user,
          typeToken: "RT",
        },
        "RT"
      );

      res.status(200).send({
        message: "User signs in successfully",
        success: true,
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { user } = req;
      const { userName, email, bio, role } = req.body;
      const avatar = req.file;

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
      if (role && String(role) !== String(crrUser.role)) {
        updatedFields.role = role;
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
          const response = await handleFileUpload(avatar);
          if (!response.success) throw new Error(response.message);
          updatedFields.avatar = response.data;
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
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      // Get the userId
      const { userId } = req.params;

      // Check if user exist
      const crrUser = await UserModel.findById(userId);

      // If does not exist user
      if (!crrUser) throw new Error("Cannot find user");

      const user = {
        _id: crrUser._id,
        email: crrUser.email,
        userName: crrUser.userName,
        role: crrUser.role,
        bio: crrUser.bio,
        avatar: crrUser.avatar,
        likedGames: crrUser.likedGames,
        interests: crrUser.interests,
      };

      res.status(201).send({
        message: "Here is this user info!",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  likeGame: async (req, res) => {
    try {
      // Get the userId
      const { game } = req.body;
      const { user } = req;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { likedGames: game } }, // prevents duplicates
        { new: true }
      );

      if (!updatedUser) throw new Error("Cannot find user!");

      res.status(200).send({
        message: "Game liked successfully!",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  unlikeGame: async (req, res) => {
    try {
      // Get the userId
      const { game } = req.body;
      const { user } = req;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $pull: { likedGames: game } },
        { new: true }
      );

      if (!updatedUser) throw new Error("Cannot find user!");

      res.status(200).send({
        message: "Game unliked successfully!",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  addInterest: async (req, res) => {
    try {
      // Get the userId
      const { interest } = req.body;
      const { user } = req;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { interests: interest } }, // prevents duplicates
        { new: true }
      );

      if (!updatedUser) throw new Error("Cannot find user!");

      res.status(200).send({
        message: "Interest added successfully!",
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  removeInterest: async (req, res) => {
    try {
      // Get the userId
      const { interest } = req.body;
      const { user } = req;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $pull: { interests: interest } }, // prevents duplicates
        { new: true }
      );

      if (!updatedUser) throw new Error("Cannot find user!");

      res.status(200).send({
        message: "Interest removed successfully!",
        success: true,
        data: updatedUser,
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
