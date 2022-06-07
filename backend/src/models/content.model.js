const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Creator Schema
const ContentSchema = new Schema ({
    contentId:{
        type: Number,
        required:true,
        unique:true
    },
    creatorId:{
        type: String,
        required:true,
        unique: false
    },
    link:{
        type: String,
        required: true,
        unique: true	
    },
    timestamp:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    tag:{
        type: String
    },
    comments:{
    	type: Array
    },
    upvotes:{
        type: Number
    },
    views:{
        type: Number
    },
    thumbnail:{
        type: String
    }

});

const ContentModel = mongoose.model('content', ContentSchema);

module.exports = ContentModel;