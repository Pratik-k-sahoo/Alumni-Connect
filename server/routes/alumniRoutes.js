//authentication middleware is not included(included by prateek)

const express = require("express");
const router = express.Router();
const Alumni = require("../models/Alumni");

// Creating a new alumni
router.post("/alumni", async (req, res) => {
  try {
    const { user, achievements, socials } = req.body;

    const newAlumni = new Alumni({
      user,
      achievements,
      socials,
    });

    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//If alumni wants to edit his information
router.put("/alumni/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, achievements, socials } = req.body;

    const updatedAlumni = await Alumni.findByIdAndUpdate(
      id,
      { user, achievements, socials },
      { new: true, runValidators: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ message: "Alumni entry not found" });
    }

    res.json(updatedAlumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//If admin wants to delete an alumni from database
router.delete("/alumni/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAlumni = await Alumni.findByIdAndDelete(id);

    if (!deletedAlumni) {
      return res.status(404).json({ message: "Alumni entry not found" });
    }

    res.json({ message: "Alumni entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
