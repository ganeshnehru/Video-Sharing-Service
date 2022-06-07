const CreatorModel = require('../models/creator.model')


// Get All Creators
exports.getAllCreators = async (result) => {
    try{
        const creators = await CreatorModel.find();
        console.log(creators)
        result(null, creators);
    }
    catch(err){
        result(err);
    }

}

// Get Creator By Username
exports.getCreatorByUsername = async (username, result) => {
    try{
        const creator = await CreatorModel.findOne({username:username});

        result(null, creator);

    }
    catch(err){
        result(err);
    }
}
