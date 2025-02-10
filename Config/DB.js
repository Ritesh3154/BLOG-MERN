const { default: mongoose } = require('mongoose');

exports.dbConnect = () => {
    mongoose.connect('mongodb+srv://riteshpatdia0723:ritesh3154@ritesh.lxy6r.mongodb.net/blog-mern')
        .then(() => {
            console.log("connected..👍");
        })
        .catch((err) => {
            console.log(err);
        })
}

