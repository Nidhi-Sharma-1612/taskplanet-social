import Post from "../models/Post.js";

// @route GET /api/posts
// @desc Get public feed
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/posts
// @desc Create a post
export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Post must contain text or image" });
    }

    const post = await Post.create({
      user: req.user._id,
      username: req.user.username,
      text,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/posts/:id/like
// @desc Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const username = req.user.username;

    const alreadyLiked = post.likes.includes(username);

    if (alreadyLiked) {
      post.likes = post.likes.filter((u) => u !== username);
    } else {
      post.likes.push(username);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/posts/:id/comment
// @desc Comment on a post
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      username: req.user.username,
      text,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
