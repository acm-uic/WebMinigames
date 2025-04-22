import PostModel from "../models/post.js";
import { handleFileUpload } from "../utils/upload.js";
import { authorizeUser } from "../utils/authorize.js";

const PostControllers = {
  createPost: async (req, res) => {
    try {
      const { user } = req;
      const { title, body } = req.body;
      const listFile = req.images;

      const listMedia = [];

      // If user upload files
      if (listFile) {
        for (const file of listFile) {
          const response = await handleFileUpload(file);
          if (!response.success) throw new Error(response.message);
          listMedia.push(response.data);
        }
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
  updatePost: async (req, res) => {
    try {
      const { user } = req;
      const { title, body } = req.body;
      const { postId } = req.params;
      const listFile = req.images;

      // Get the current post
      const crrPost = await PostModel.findById(postId);
      if (!crrPost) throw new Error("Cannot find post!");

      const authorized = authorizeUser(user._id, crrPost.author);
      if (!authorized.success) throw new Error(authorized.message);

      const updatedFields = {};
      // Only update the fields that are different from the original
      if (title && String(title) !== String(crrPost.title)) {
        updatedFields.title = title;
      }
      if (body && String(body) !== String(crrPost.body)) {
        updatedFields.body = body;
      }
      // Update the listMedia regardless whether it has been changed
      // More efficient
      const listMedia = [];
      if (listFile) {
        for (const file of listFile) {
          const response = await handleFileUpload(file);
          if (!response.success) throw new Error(response.message);
          listMedia.push(response.data);
        }
      }
      updatedFields.images = listMedia;
      // Update the post
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: updatedFields },
        { new: true }
      );
      // Return the updated post
      res.status(200).send({
        message: "Post updated successfully!",
        success: true,
        data: updatedPost,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const listPosts = await PostModel.find();
      if (listPosts.length === 0) throw new Error("No posts found!");

      res.status(201).send({
        message: "Here is a list of posts!",
        success: true,
        data: listPosts,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getPostsByUser: async (req, res) => {
    try {
      const { userId } = req.query;
      const listPosts = await PostModel.find({
        author: userId,
      });
      if (listPosts.length === 0) {
        throw new Error("No posts by this user found!");
      }

      res.status(201).send({
        message: "Here is a list of posts by this user!",
        success: true,
        data: listPosts,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getPostById: async (req, res) => {
    try {
      const { postId } = req.query;
      const crrPost = await PostModel.findById(postId);

      if (!crrPost) throw new Error("This post doesn't exist!");

      res.status(201).send({
        message: "Here is your post!",
        success: true,
        data: crrPost,
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
