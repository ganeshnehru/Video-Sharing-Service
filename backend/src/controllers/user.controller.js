const UserService = require('../services/user.service')

// Get All Users
exports.getAllUsers = (req,res) => {
    console.log("\nGET ALL USERS");

    UserService.getAllUsers((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
            console.log(result);
        }
    })
}


// Get User by username
exports.getUserByUsername = (req, res) => {
    console.log("Inside Controller: Get Profile: ", req.params.username);

    UserService.getUserByUsername(req.params.username ,(err, result) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        if(result == null)
        {
            console.log("No Such User exists");
            res.status(404).send("No such user exists");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Get User Following
exports.getFollowing = (req, res) => {
    console.log("Inside User Controller: Get User Following: ", req.params.username);

    UserService.getFollowing(req.params.username, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            console.log("\nUser Following Retrieved")
            res.send(result)
        }
    })
}


// Subscribe
exports.subscribe = (req, res) => {
    console.log("Inside User Controller: Subscribe: ", req.params.username);

    UserService.subscribe(req.params.username, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            console.log("\nUser Subscribed")
            res.send(result)
        }
    })
}


// Unsubscribe
exports.unsubscribe = (req, res) => {
    console.log("Inside User Controller: UnSubscribe: ", req.params.username);

    UserService.unsubscribe(req.params.username, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            console.log("\nUser UnSubscribed")
            res.send(result)
        }
    })
}


// Follow Creator
exports.followCreator = (req, res) => {
    console.log("Insdie User Controller: Follow Creator: ", req.body.creatorUsername);

    UserService.followCreator(req.body, req.params.username, (err,result) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log(result);
            console.log("Creator Followed");
            res.status(200).send(result);
        }
    })
}

// Unfollow Creator
exports.unfollowCreator = (req, res) => {
    console.log("Inside User Controller: Unfollow Creator: ", req.body.creatorUsername);

    UserService.unfollowCreator(req.body, req.params.username, (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        if(result == null)
        {
            console.log("No Such Creator is follwed");
            res.status(404).send("No Such Creator is follwed");
        }
        else{
            console.log(result);
            console.log("Creator Unfollowed");
            res.status(200).send(result);
        }
    })
}