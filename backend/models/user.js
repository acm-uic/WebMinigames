import mongoose from "mongoose";
import Collections from "../database/collections.js";

// Create a schema for the user
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
  avatar: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg",
  },
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
});

// Creating a user model
const UserModel = mongoose.model(Collections.users, UserSchema);

export default UserModel;
