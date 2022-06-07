const UserModel = require('../models/user.model');
const CreatorModel = require('../models/creator.model');


// Get All Users
exports.getAllUsers = async (result) => {
    try{
        const users = await UserModel.find();
        console.log(users)
        result(null, users);
    }
    catch(err){
        result(err);
    }

}

// Get User By Username
exports.getUserByUsername = async (username, result) => {
    try{
        const user = await UserModel.findOne({username:username});

        result(null, user);

    }
    catch(err){
        result(err);
    }
}


// Get User Following
exports.getFollowing = async (username, result) => {
    try{
        const user = await UserModel.findOne({username:username});

        result(null, user.following);
    }
    catch(err){
        result(err);
    }
}


// Update User Subscribed
exports.subscribe = async (username, result) => {
    try{
        await UserModel.findOneAndUpdate({username:username},
            {
                $set:{
                    subscribed:true
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"User Subscribed"});
    }
    catch(err){
        result(err);
    }
}


// Update User UnSubscribed
exports.unsubscribe = async (username, result) => {
    try{
        await UserModel.findOneAndUpdate({username:username},
            {
                $set:{
                    subscribed:false
                }
            },
            {returnOriginal:false});

        result(null, {status: true, message:"User UnSubscribed"});
    }
    catch(err){
        result(err);
    }
}


// Follow Creator
exports.followCreator = async(reqBody, username, result) => {
    
    const creatorId = reqBody.creatorUsername;
    
    try{
        // Push to User's following list
        await UserModel.findOneAndUpdate({username:username},
            {$push : {following : creatorId}});
        
        // Push to creator's followers list
        await CreatorModel.findOneAndUpdate({username:creatorId},
            {$push : {followers : username}});

        result(null, {status: true, message:"Creator Followed"});
    }
    catch(err){
        result(err);
    }
}

// Unfollow Creator
exports.unfollowCreator = async(reqBody, username, result) => {
    const creatorId = reqBody.creatorUsername;

    try{
        // Remove from User's following list
        const creator = await UserModel.findOneAndUpdate({username:username},
            {$pull : {following: creatorId}});

        // Remove from creator's followers list
        await CreatorModel.findOneAndUpdate({username:creatorId},
            {$pull : {followers: username}});
        
        console.log("HERE",creator)
        if(creator.following.includes(creatorId)){
            result(null, {status:true , message:"Creator Unfollowed"});
        }
        else{
            result(null);
        }
    }
    catch(err){
        result(err);
    }
}