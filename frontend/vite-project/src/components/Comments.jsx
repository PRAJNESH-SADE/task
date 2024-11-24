import React, { useEffect, useState } from 'react';
import API from '../api';
import './Comments.css';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      alert('Failed to fetch comments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/comments', { text, postId });
      setText(''); // Clear the comment input field
      fetchComments(); // Refresh comments
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <strong>{comment.user.name}:</strong> {comment.text}
          </p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default Comments;
