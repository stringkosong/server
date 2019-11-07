const { Schema, model } = require('mongoose')

const contentSchema = new Schema ({
    author: {
        type: String
    },
    image: {
        type: String
    },
    quote: {
        type: String
    },
    comments: [{
        author: String,
        msg: String
    }]
},{ timestamps: true, versionKey: false })



const Content = model('Content',contentSchema)

module.exports = Content