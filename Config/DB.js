const { default: mongoose } = require('mongoose');

exports.dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/blog-mern')
        .then(() => {
            console.log("connected..👍");
        })
        .catch((err) => {
            console.log(err);
        })
}

