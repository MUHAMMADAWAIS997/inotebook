const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
//Route 1: fetch all notes using GET method: login required
router.get("/getNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server errror" });
  }
});
//Route 2: Create a note using POST method: login-required
router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Title should be minimum 3 character long").isLength({
      min: 3,
    }),
    body("description", "Minimum Length of description should be 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const validate = validationResult(req);
      if (!validate.isEmpty()) {
        return res.status(400).json({ error:validate.array()});
      }
      const note = await Notes.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ error: "Internal Server error" });
    }
    const { title, description, tag } = req.body;
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      res.status(400).json({ error: "All feilds required" });
    }
    }
);
//Route 3: Update a note using PUT method (login required):
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    const {title,description,tag}=req.body
    const note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).json({message:'Note not Found'})
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).json({error:"Not Allowed"})
    }
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{title,description,tag},{new:true,runValidators:true})
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server errror" });
  }
})

//Route 4: Delete a note using DELETE method (login required):
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    const note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).json({message:'Note not Found'})
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).json({error:"Not Allowed"})
    }
    const updatedNote = await Notes.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Note deleted Successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal server errror" });
  }
})
module.exports = router;
