const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

            intensity:Number,
            sector:String,
            country:String,
            relevance:Number,
            likelihood:Number,
            end_year:Number,
            source:String,
            city:String,
            topic:String
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel;