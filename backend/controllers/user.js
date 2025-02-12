import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

const UserControllers = {
  createUser: async (req, res) => {
    try {
      // Get the info from the user
      const { userName, email, password, avatar } = req.body;

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
      });

      res.status(201).send({
        message: "User created successfully",
        success: true,
        data: newUser,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        success: true,
        data: null,
      });
    }
  },
};

export default UserControllers;
