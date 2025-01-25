const router = require('express').Router()
const adminController = require('../Controller/AdminController')
const upload = require('../middleware/UploadFile')

router.post('/register', adminController.register)
router.post('/login', adminController.login)
router.post('/updateprofile', upload.single('admin_profile'), adminController.updateprofile)

module.exports = router