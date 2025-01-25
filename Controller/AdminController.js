const Admin = require("../Model/AdminModel")
const blog = require("../Model/BlogModel")
const { plainToHash, hashToPlain } = require("../utils/password")

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmpwd } = req.body

        const existEmail = await Admin.findOne({ email: email }).countDocuments().exec()

        if (existEmail > 0) {
            res.json("email already exist ")
        } else {

            const hash = await plainToHash(password)
            console.log(hash);
            await Admin.create({ username, email, password: hash, confirmpwd })
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    const existEmail = await Admin.findOne({ email: email }).countDocuments().exec()
    if (existEmail > 0) {
        const existUser = await Admin.findOne({ email })
        console.log(existUser);
        const matchPass = await hashToPlain(password, existUser.password)
        if (matchPass) {
            const payload = {
                username: existUser.username,
                email: existUser.email
            }
            res.cookie('admin', payload, { httpOnly: true })
            res.redirect('/')
        } else {
            res.json("pass does not match!!")
        }
    } else {
        res.json("email does not exists")
    }
}
exports.updateprofile = async (req, res) => {
    try {
        const { email, username } = req.body
        const existemail = await Admin.findOne({ email }).countDocuments().exec()
        console.log(req.file)
        if (existemail > 0) {
            await Admin.updateOne(
                {
                    email: email
                },
                {
                    username,
                    admin_profile: req.file.filename
                }
            )
            res.redirect('/MyProfile')
        } else {
            res.json("email id not exist")
        }
    } catch (error) {
        console.log(error)
    }   
}