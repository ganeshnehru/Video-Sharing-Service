var express = require('express');
var router = express.Router();

// Import creator controller
const contentController = require('../controllers/content.controller');

// Get All Content          GET
router.get('/', contentController.getAllContent);

// Get Content by ID        GET
router.get('/:id', contentController.getContentByID);

// Get Content by Creator   GET
router.get('/bycreator/:creator', contentController.getContentByCreator);

// Get Content by Tag       GET
router.get('/bytag/:tag', contentController.getContentByTag);

// Get Content by Title     GET
router.get('/search/:title', contentController.getContentByTitle);

// Get Content by Time      GET
router.get('/bydate/:startDate&:endDate', contentController.getContentByTime);

// Creat Content            POST
router.post('/', contentController.createContent);

// Increment View           POST
router.post('/view/:contentId', contentController.incrementView);

// Upvote                   POST
router.post('/upvote/:contentId', contentController.upvote);


module.exports = router;