var express = require('express');
var router = express.Router();

// Import user controller
const userController = require('../controllers/user.controller');

// Get All users     GET
router.get('/', userController.getAllUsers);

// Get a user        GET
router.get('/:username', userController.getUserByUsername);

// Get following     GET
router.get('/following/:username', userController.getFollowing);

// Subscribe         PATCH
router.patch('/sub/:username', userController.subscribe);

// UnSubscribe       PATCH
router.patch('/unsub/:username', userController.unsubscribe);

// Follow Creator    PATCH
router.patch('/follow/:username', userController.followCreator);

// Unfollow Creator    PATCH
router.patch('/unfollow/:username', userController.unfollowCreator);

module.exports = router;