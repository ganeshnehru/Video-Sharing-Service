const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

// Creator Schema
const CreatorSchema = new Schema ({
    username:{
        type: String,
        //required:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        //required:true
    },
    password:{
        type: String,
        required: true,
    },
    creditcard:{
        type: String,
    },
    followers:{
        type: Array,
    },
    content:{
        type: Array,
    }

});

// Hash the password
CreatorSchema.pre(
    'save',
    async function(next){
        const creator = this;
        const hash= await bcrypt.hash(this.password,10);

        this.password = hash;
        next();
    }
)

// Validate the creator login
CreatorSchema.methods.isValidPassword = async function(password){
    const creator = this;
    const compare = await bcrypt.compare(password,creator.password);

    return compare;
}

const CreatorModel = mongoose.model('creator', CreatorSchema);

module.exports = CreatorModel;