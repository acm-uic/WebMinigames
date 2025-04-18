import GameModel from "../models/game.js";
import { handleFileUpload } from "../utils/upload.js";

const GameControllers = {
  createGame: async (req, res) => {
    try {
      // Get info from req
      const { user } = req;
      const { gameName, description, relatedLinks } = req.body;
      const coverImage = req.files?.coverImage?.[0]; // single file
      const listFile = req.files?.media || []; // array of files

      const existedGame = await GameModel.findOne({
        gameName: gameName,
      });

      if (existedGame) {
        throw new Error("This gameName is used. Please use another name");
      }

      // Create a game payload
      const gamePayload = {
        gameName,
        description,
        relatedLinks,
        author: user._id,
      };
      // If user upload media
      if (coverImage) {
        const response = await handleFileUpload(coverImage);
        if (!response.success) throw new Error(response.message);
        gamePayload.coverImage = response.data;
      }

      if (listFile) {
        const listMedia = [];
        for (const file of listFile) {
          const response = await handleFileUpload(file);
          if (!response.success) throw new Error(response.message);
          listMedia.push(response.data);
        }
        gamePayload.media = listMedia;
      }

      const newGame = await GameModel.create(gamePayload);

      res.status(201).send({
        message: "Game created successfully",
        success: true,
        data: newGame,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getAllGames: async (req, res) => {
    try {
      const listGames = await GameModel.find();
      if (listGames.length === 0) throw new Error("No games found!");

      res.status(200).send({
        message: "Here is a list of all the games",
        success: true,
        data: listGames,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getGameById: async (req, res) => {
    try {
      const { gameId } = req.params;

      const crrGame = await GameModel.findById(gameId);

      if (!crrGame) throw new Error("Cannot find game!");

      res.status(200).send({
        message: "Here is your game",
        success: true,
        data: crrGame,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
};

export default GameControllers;
