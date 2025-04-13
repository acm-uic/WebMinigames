import mongoose from "mongoose";
import Collections from "../database/collections.js";

const GameSchema = mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    media: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Collections.users,
    },
    relatedLinks: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.model(Collections.games, GameSchema);
export default GameModel;
