const Admin = require('../Model/AdminModel')
const blog = require('../Model/BlogModel')
const { matchLogin } = require('../utils/LoginMiddleware')

const router = require('express').Router()

router.get('/', matchLogin, (req, res) => {
    res.render('pages/index')
    // matchLogin(req, res, 'pages/index')
})
router.get('/add', matchLogin, (req, res) => {
    res.render('pages/Addblog')
    // matchLogin(req, res, 'pages/Addblog')
})
router.get('/view', matchLogin, async (req, res) => {
    const blogss = await blog.find()
    console.log(blogss)
    res.render('pages/ViewBlog', { blogss })
})
router.get('/UpdateBlog', matchLogin, async (req, res) => {
    const { id } = req.query
    const blogss = await blog.findById(id)
    console.log(blogss)
    res.render('pages/UpdateBlog', { blogss })
})



router.get('/login', (req, res) => {
    res.render('pages/login', { message: req.flash('info') })
})
router.get('/register', (req, res) => {
    res.render('pages/register')
})
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})
router.get('/MyProfile', async (req, res) => {

    const email = req?.user?.email
    const singleAdmin = await Admin.findOne({ email })

    // const admin = req.cookies.admin
    res.render('pages/MyProfile', { admin: singleAdmin })
})
router.get('/ChangePassword', (req, res) => {
    const email = req?.user?.email
    res.render('pages/ChangePassword', { email })
})


module.exports = router