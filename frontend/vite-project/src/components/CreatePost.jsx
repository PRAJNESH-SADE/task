import React, { useState } from 'react';
import API from '../api';
import './CreatePost.css';

const CreatePost = ({ fetchPosts }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', { text, media });
      alert('Post created successfully!');
      setText('');
      setMedia('');
      fetchPosts(); // Refresh the posts list
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <textarea placeholder="Write something..." value={text} onChange={(e) => setText(e.target.value)} required />
      <input type="text" placeholder="Media URL" value={media} onChange={(e) => setMedia(e.target.value)} />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
