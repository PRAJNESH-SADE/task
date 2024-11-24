const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a Comment
router.post('/comments', auth, async (req, res) => {
  const { text, postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({ text, post: postId, user: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
