const CreatorService = require('../services/creator.service')

// Get All Creators
exports.getAllCreators = (req,res) => {
    console.log("\nGET ALL CREATORS");

    CreatorService.getAllCreators((err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
            console.log(result);
        }
    })
}


// Get Creator by username
exports.getCreatorByUsername = (req, res) => {
    console.log("Inside Creator Controller: Get Creator Profile: ", req.params.username);

    CreatorService.getCreatorByUsername(req.params.username ,(err, result) => {
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        if(result == null)
        {
            console.log("No Such Creator exists");
            res.status(404).send("No such Creator exists");
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
}
