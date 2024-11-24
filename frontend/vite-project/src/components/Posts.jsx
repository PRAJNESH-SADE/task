import React, { useEffect, useState } from 'react';
import API from '../api';
import CreatePost from './CreatePost';
import Comments from './Comments';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      alert('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <CreatePost fetchPosts={fetchPosts} />
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <p>
            <strong>{post.user.name}:</strong> {post.text}
          </p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
          <Comments postId={post._id} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
