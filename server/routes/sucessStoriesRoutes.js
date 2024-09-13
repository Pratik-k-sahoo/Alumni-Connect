//authorization middleware will be implemented by prateek

const express = require("express");
const router = express.Router();
const SuccessStories = require("../models/SuccessStories");

//creating story
router.post("/success-stories", async (req, res) => {
  try {
    const { user, title, description } = req.body;

    const newSuccessStory = new SuccessStories({
      user,
      title,
      description,
    });
    const savedSuccessStory = await newSuccessStory.save();
    res.status(201).json(savedSuccessStory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a Success Story
router.put("/success-stories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, title, description } = req.body;

    const updatedSuccessStory = await SuccessStories.findByIdAndUpdate(
      id,
      { user, title, description },
      { new: true, runValidators: true }
    );

    if (!updatedSuccessStory) {
      return res.status(404).json({ message: "Success story not found" });
    }

    res.json(updatedSuccessStory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a Success Story
router.delete("/success-stories/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSuccessStory = await SuccessStories.findByIdAndDelete(id);

    if (!deletedSuccessStory) {
      return res.status(404).json({ message: "Success story not found" });
    }

    res.json({ message: "Success story deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
