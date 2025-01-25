const Admin = require('../Model/AdminModel')
const blog = require('../Model/BlogModel')
const { matchLogin } = require('../utils/LoginMiddleware')

const router = require('express').Router()
router.get('/', (req, res) => {
    // res.render('pages/index')
    matchLogin(req, res, 'pages/index')
})
router.get('/add', (req, res) => {
    // res.render('pages/Addblog')
    matchLogin(req, res, 'pages/Addblog')
})
router.get('/view', async (req, res) => {
    const blogss = await blog.find()
    console.log(blogss)
    res.render('pages/ViewBlog', { blogss })
})
router.get('/UpdateBlog', async (req, res) => {
    const { id } = req.query
    const blogss = await blog.findById(id)
    console.log(blogss)
    res.render('pages/UpdateBlog', { blogss })
})



router.get('/login', (req, res) => {
    res.render('pages/login')
})
router.get('/register', (req, res) => {
    res.render('pages/register')
})
router.get('/logout', (req, res) => {
    res.clearCookie('admin')
    res.redirect('/login')
})
router.get('/MyProfile', async (req, res) => {

    const cookieData = req.cookies.admin
    console.log(cookieData)
    console.log(cookieData.email)

    const email = cookieData.email
    const singleAdmin = await Admin.findOne({ email })

    // const admin = req.cookies.admin
    res.render('pages/MyProfile', { admin: singleAdmin })
})

module.exports = router