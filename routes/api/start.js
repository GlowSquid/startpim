const express = require('express');
const router = express.Router();

// @route   GET api/start/test
// @desc    Tests Start Route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Start Works' }));

module.exports = router;
