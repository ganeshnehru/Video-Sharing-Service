var express = require('express');
var router = express.Router();

// Import creator controller
const creatorController = require('../controllers/creator.controller');

// Get All users     GET
router.get('/', creatorController.getAllCreators);

// Get a user        GET
router.get('/:username', creatorController.getCreatorByUsername);


module.exports = router;