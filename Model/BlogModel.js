const { Schema, model } = require("mongoose");

const common = {
    type: String,
    required: true,
    unique: true,
    trim: true,
}

const CategorySchema = new Schema({
    blog_name: {
        ...common
    },
    blog_price: {
        ...common,
        type: Number,
        unique: false
    },
    blog_desc: {
        ...common,
        unique: false
    },
    blog_cat: {
        ...common,
    },
    blog_profile: {
        type: String,
        unique: true
    }
})

const blog = model('Blog', CategorySchema)
module.exports = blog