import PostModel from "../models/post.js";
import { handleFileUpload } from "../utils/upload.js";

const PostControllers = {
  createPost: async (req, res) => {
    try {
      const { user } = req;
      const { title, body } = req.body;
      const listFile = req.files;

      const listMedia = [];

      // If user upload files
      for (const file of listFile) {
        const response = await handleFileUpload(file);
        if (!response.success) throw new Error(response.message);
        listMedia.push(response.data);
      }

      const newPost = await PostModel.create({
        author: user._id,
        title,
        body,
        images: listMedia,
      });

      res.status(201).send({
        message: "Post created successfully",
        success: true,
        data: {
          ...newPost.toObject(),
          userName: user.userName,
        },
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

export default PostControllers;
