import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ username }) => {
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await axios.get(`/api/comments/${username}`);
          setComments(response.data.comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      // Listen for 'newComment' socket event
    socket.on('newComment', (data) => {
      const { userProfile, comment } = data;
      // Update comments state with the new comment
      setComments((prevComments) => [...prevComments, comment]);
    });

    // Clean up socket listener
    return () => {
      socket.off('newComment');
    };
  }, [username]);
  
      fetchComments();
  
   
  
    return (
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CommentList;