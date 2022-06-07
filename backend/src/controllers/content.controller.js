const ContentService = require('../services/content.service')

// Get All Creators
exports.getAllContent = (req,res) => {
    console.log("\nGET ALL CONTENT");

    ContentService.getAllContent((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
            console.log(result);
        }
    })
}

exports.getContentByID = (req, res) => {
    console.log("Inside Content Controller: Get Content by ID: ", req.params.id);

    if(req.params.id == "undefined"){
        console.log("No Such Content exists");
        res.status(404).send("No such Content exists");
    }
    else{

        ContentService.getContentByID(req.params.id ,(err, result) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            if(result == null)
            {
                console.log("No Such Content exists");
                res.status(404).send("No such Content exists");
            }
            else{
                console.log(result);
                res.status(200).send(result);
            }
        })
    }

}

exports.getContentByCreator = (req, res) => {
    console.log("Inside Content Controller: Get Content by Creator: ", req.params.creator);

    ContentService.getContentByCreator(req.params.creator ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Content exists");
            res.status(404).send("No such Content exists");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}

exports.getContentByTag = (req, res) => {
    console.log("Inside Content Controller: Get Content by Tag: ", req.params.tag);

    ContentService.getContentByTag(req.params.tag ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Content exists");
            res.status(404).send("No such Content exists");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}

exports.getContentByTitle = (req, res) => {
    console.log("Inside Content Controller: Get Content by Title: ", req.params.title);

    ContentService.getContentByTitle(req.params.title ,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Content exists");
            res.send("No such Content exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}

exports.getContentByTime = (req, res) => {
    console.log("Inside Content Controller: Get Content within Timerange: ", req.params.startDate, req.params.endDate);

    ContentService.getContentByTime(req.params.startDate, req.params.endDate,(err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("No Such Content exists");
            res.send("No such Content exists");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
}

exports.createContent = (req, res) => {
    console.log("Create Content ", req.body);

    const contentData = req.body
    ContentService.createContent(contentData, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        if(result == null)
        {
            console.log("Content Creation failed!");
            res.status(404).send("Content Creation failed!");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Increment View
exports.incrementView = (req, res) => {
    console.log("Inside Content Controller: Increment View: ", req.params.contentId);

    ContentService.incrementView(req.params.contentId, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(result);
            console.log("\nContent Viewed")
            res.send(result)
        }
    })
}


// Upvote
exports.upvote = (req, res) => {
    console.log("Inside Content Controller: UPVOTE: ", req.params.contentId);

    ContentService.upvote(req.params.contentId, (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("Content Upvoted");
            res.status(200).send(result);
        }
    })
}