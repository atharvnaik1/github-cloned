// controllers/comment.controller.js

import User from "../models/user.model.js";
import { socket,io } from "socket.io";

export const addComment = async (io, socket) => {
  try {
    const { userProfile, comment } = socket.data;

    // Find the user whose profile is being commented on
    const userToCommentOn = await User.findOne({ username: userProfile.login });

    if (!userToCommentOn) {
      throw new Error('User is not a member');
    }

    // Add the comment to the user's profile
    userToCommentOn.comments.push({ username: socket.username, comment, commentedDate: Date.now() });

    // Save the updated user profile
    await userToCommentOn.save();

    // Emit a socket event to notify all clients of the new comment
    io.emit('newComment', { userProfile, comment });

    // Send a success message to the client who added the comment
    socket.emit('commentAdded', { message: 'Comment added successfully' });
  } catch (error) {
    // Send an error message to the client if there's an error
    socket.emit('commentError', { error: error.message });
  }
};

export const getComments = async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find the user whose profile comments are being requested
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User is not a member' });
      }
  
      // Send the comments associated with the user's profile to the client
      res.status(200).json({ comments: user.comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
