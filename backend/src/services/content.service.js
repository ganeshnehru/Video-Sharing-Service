const ContentModel = require('../models/content.model');
const CreatorModel = require('../models/creator.model');


// Get All Existing Content
exports.getAllContent = async (result) => {
    try{
        const contents = await ContentModel.find();
        //console.log(contents)
        result(null, contents);
    }
    catch(err){
        result(err);
    }

}

// Get Content By ID
exports.getContentByID = async (id, result) => {
    try{
        const content = await ContentModel.findOne({contentId:id});

        result(null, content);

    }
    catch(err){
        result(err);
    }
}

// Get All Content By A Creator
exports.getContentByCreator = async (creator, result) => {
    try{
        const contents = await ContentModel.find({creatorId:creator});
        // const contents = await ContentModel.find({'creatorId': {'$regex': creator, '$options': 'i'}});

        result(null, contents);
    }
    catch(err){
        result(err);
    }
}

// Get All Content With Tag
exports.getContentByTag = async (searchedTag, result) => {
    try{
        const contents = await ContentModel.find({tag:searchedTag});

        result(null, contents);
    }
    catch(err){
        result(err);
    }
}

// Get Content By Title
exports.getContentByTitle = async (inputTitle, result) => {
    try{
        // const content = await ContentModel.findOne({title:inputTitle});
        const contents = await ContentModel.find({'title': {'$regex': inputTitle, '$options': 'i'}});

        result(null, contents);

    }
    catch(err){
        result(err);
    }
}

// Create Content
exports.createContent = async (contentReqData, result) => {
    try{

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const contentId = Math.floor(Math.random() * 999999) + 1;
        const timestamp = today;
        const upvotes = 0;
        const views = 0;
        const comments = [];

        const creatorId = contentReqData.creatorId;
        const link = contentReqData.link;
        const title = contentReqData.title;
        const tag = contentReqData.tag;
        const thumbnail = contentReqData.thumbnail;
        

        const content = await ContentModel.create({
            contentId,
            creatorId,
            link,
            timestamp,
            title,
            tag,
            comments,
            upvotes,
            views,
            thumbnail
        });

        await CreatorModel.findOneAndUpdate({username: creatorId},
            {$push : {content : contentId}})

        result(null, content);

    }
    catch(err){
        result(err);
    }
}


// Increment View
exports.incrementView = async (contentId, result) => {
    try{
        await ContentModel.findOneAndUpdate({contentId: contentId},
            {$inc : {'views' : 1}}, {returnOriginal:false}
        );

        result(null, {status: true, message:"Content Viewed"});

    }
    catch(err){
        result(err);
    }
}


// Upvote
exports.upvote = async (contentId, result) => {

    try{
        await ContentModel.findOneAndUpdate({contentId: contentId},
            {$inc : {'upvotes' : 1}} , {returnOriginal:false}
        );

        result(null, {status:true, message:"Content Upvoted"});
    }
    catch(err){
        result(err);
    }
}