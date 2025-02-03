const router = require('express').Router()
const passport = require('passport')
const sendMail = require('../Config/Mail')
const adminController = require('../Controller/AdminController')
const upload = require('../middleware/UploadFile')

router.post('/register', adminController.register)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }))
router.post('/updateprofile', upload.single('admin_profile'), adminController.updateprofile)
router.post('/ChangePassword', adminController.ChangePassword)
router.post('/forgotpassword', adminController.forgetpassword)
// router.get('/sendmail', async (req, res) => {
//     await sendMail('sahilvaghela975@gmail.com', 'send mail')
// })
module.exports = router

