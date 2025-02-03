const Admin = require("../Model/AdminModel")
const blog = require("../Model/BlogModel")
const { plainToHash, hashToPlain } = require("../utils/password")
const otpGenerator = require('otp-generator')
const sendEmail = require('../Config/Mail')
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
            req.flash("info", "you are registered")
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

exports.ChangePassword = async (req, res) => {

    const { email, password, new_pass, confirm_pass } = req.body
    const existEmail = await Admin.findOne({ email }).countDocuments().exec()
    if (existEmail > 0) {
        const existUser = await Admin.findOne({ email })
        // console.log(existUser);
        const matchpwd = await hashToPlain(password, existUser.password)
        if (matchpwd) {
            if (new_pass === confirm_pass) {
                const hash_pass = await plainToHash(new_pass)
                await Admin.updateOne(
                    {
                        email: email
                    },
                    {
                        password: hash_pass
                    }
                )
                res.redirect('/ChangePassword')
            } else {
                res.json("confirm password does not match")
            }
        } else {
            res.json("password does not match")
        }
    } else {
        res.json("email does not exist!!")
    }
}
exports.forgetpassword = async (req, res) => {
    try {
        // console.log(req.body);
        const { email } = req.body
        const existemail = await Admin.findOne({ email }).countDocuments().exec()
        if (existemail > 0) {
            // const otp = Math.floor(Math.random() * 1000000)
            var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            await sendEmail(email, 'forget password', `${otp}`)
            req.flash("info", "check your email")
            res.redirect('/login')
        } else {
            req.flash("info", "email dose not exist")
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
}