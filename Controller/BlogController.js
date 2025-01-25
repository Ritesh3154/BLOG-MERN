const blog = require('../Model/BlogModel');

exports.store = async (req, res) => {
    const { blog_name, blog_price, blog_desc } = req.body

    try {
        if (blog_name == "" || blog_price == "" || blog_desc == "") {
            res.json("all fields are required!!")
        } else {
            // console.log(req.body);
            console.log(req.file.filename)
            const blogs = await blog.create({ blog_name, blog_price, blog_desc, blog_profile: req.file.filename })

            if (blogs) {
                // res.json("inserted✅")
                res.redirect('/view')
            }
        }
    } catch (error) {
        console.log(error)
    }

}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        await blog.findByIdAndDelete(id)
        res.redirect('/view')
    } catch (error) {
        console.log(error)
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params
        const { blog_name, blog_desc, blog_price } = req.body

        var img = ""
        if (req.file) {
            img = req.file.filename
        } else {
            img = req.body.blog_profile
        }

        await blog.findByIdAndUpdate(
            {
                _id: id
            },
            { blog_name, blog_price, blog_desc, blog_profile: img }
        )

        res.redirect('/view')
    } catch (error) {
        console.log(error)
    }
}

