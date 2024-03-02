import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
// import socket from '../socket'; // Assuming you have a Socket.IO instance set up

const CommentProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error('Please enter a comment.');
      return;
    }

    // Emit a socket event to add the comment
    socket.emit('addComment', {userProfile, comment });

    // Clear the comment input field
    setComment('');
  };

  return (
    <div>
      <div className="mb-4 flex items-center">
        <textarea
          
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="text-black h-11 w-30 p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <button
        onClick={handleAddComment}
        className="flex items-center gap-2 p-2 bg-glass rounded-md border border-blue-400 text-xs font-medium"
      >
        <FaComment size={16} />
        Add Comment
      </button>
    </div>
  );
};

export default CommentProfile;