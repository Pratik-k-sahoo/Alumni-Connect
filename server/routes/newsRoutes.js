//authentication middleware is not included

const express = require("express");
const router = express.Router();
const News = require("../models/News");

//creating  route for news
router.post("/news", async (req, res) => {
  try {
    const { title, content, created_by } = req.body;

    const newNews = new News({
      title,
      content,
      created_by,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//editing or updating route for news
router.put("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, created_by } = req.body;

    // Find the news entry by ID and update it
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content, created_by },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete button route for deleting the news
router.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.json({ message: "News item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
