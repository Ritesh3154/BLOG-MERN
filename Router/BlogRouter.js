const router = require('express').Router()
const BlogController = require('../Controller/BlogController')
const upload = require('../middleware/UploadFile')

router.post('/', upload.single('blog_profile'), BlogController.store)
router.get('/:id', BlogController.trash)
router.post('/:id', upload.single('blog_profile'), BlogController.edit)
module.exports = router