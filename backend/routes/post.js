const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const auth = require('../middleware/auth');

// Create a Post
router.post('/posts', auth, async (req, res) => {
  const { text, media } = req.body;
  try {
    const post = new Post({ text, media, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all Posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
