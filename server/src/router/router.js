const router = require("express").Router();
const Post = require("../models/Posts");
//get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json({ error: err });
  }
});

//add new post
router.post("/posts", async (req, res) => {
  const { title, description } = req.body;
  const newPost = new Post({ title, description });
  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.json({
      Error: error
    });
  }
});

//delete post
router.delete("/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
