const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    blog_name: {
        type: String,

    },
    blog_price: {
        type: String,

    },
    blog_desc: {
        type: String,

    },
    blog_profile: {
        type: String
    }
})

const blog = model('Blog', CategorySchema)
module.exports = blog