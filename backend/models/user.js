import mongoose from "mongoose";
import Collections from "../database/collections";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
});

const UserModel = mongoose.model(Collections.users, UserSchema);

export default UserModel;
