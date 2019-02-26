const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateStartInput = require("../../validation/start");
const validateBookmarksInput = require("../../validation/bookmarks");

// Load Start Model
const Start = require("../../models/Start");
// Load User Model
const User = require("../../models/User");

// @route   GET api/start/test
// @desc    Tests Start Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Start Works" }));

// @route   GET api/start
// @desc    Access Current users Startpage
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Start.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(start => {
        if (!start) {
          errors.nostart = "There is no startpage for this user";
          return res.status(404).json(errors);
        }
        res.json(start);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/start
// @desc    Create &/ Edit Current users Startpage
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStartInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get Fields
    const startFields = {};
    startFields.user = req.user.id;
    if (req.body.handle) startFields.handle = req.body.handle;

    if (typeof req.body.tags !== "undefined") {
      startFields.tags = req.body.tags.split(",");
    }

    Start.findOne({ user: req.user.id }).then(start => {
      if (start) {
        // Update
        Start.findOneAndUpdate(
          { user: req.user.id },
          { $set: startFields },
          { new: true }
        ).then(start => res.json(start));
      } else {
        // Create

        // Check if handle exist
        Start.findOne({ handle: startFields.handle }).then(start => {
          if (start) {
            errors.handle = "That handle already exist";
            res.status(400).json(errors);
          }
          // Save startpage
          new Start(startFields).save().then(start => res.json(start));
        });
      }
    });
  }
);

// @route   POST api/start/bookmarks
// @desc    Add Bookmarks
// @access  Private
router.post(
  "/bookmarks",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookmarksInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Start.findOne({ user: req.user.id }).then(start => {
      const newBM = {
        title: req.body.title,
        url: req.body.url, // must be url field
        tag: req.body.tag, // select from menu or create new
        icon: req.body.icon, // select an img or auto-scrape favicon
        color: req.body.color, // hexcode for now
        added: req.body.added,
        updated: req.body.updated,
        description: req.body.description
      };

      // add to bm array
      start.bookmarks.unshift(newBM); // puts it on top
      start.save().then(start => res.json(start));
    });
  }
);

// @route   DELETE api/start/bookmarks/:bm_id
// @desc    Delete Bookmark from start
// @access  Private
router.delete(
  "/bookmarks/:bm_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookmarksInput(req.body);

    Start.findOne({ user: req.user.id })
      .then(start => {
        // Get remove index
        const removeIndex = start.bookmarks
          .map(item => item.id)
          .indexOf(req.params.bm_id);

        // splice out of array
        start.bookmarks.splice(removeIndex, 1);

        // save
        start.save().then(start => res.json(start));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/start
// @desc    Delete User and Bookmarks
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Start.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
