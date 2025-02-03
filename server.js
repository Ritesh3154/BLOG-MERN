const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')


app.use(express.static('public'))
app.use('/public', express.static("uploads"))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

//passport setup
const passport = require('passport')
const passportAuth = require('./utils/passport')
passportAuth(passport)

app.use(passport.initialize())
app.use(passport.session())

const BlogRouter = require('./Router/BlogRouter')
const AdminRouter = require('./Router/AdminRoute')
const ViewRouter = require('./Router/ViewRouter')


app.use('/', ViewRouter)
app.use('/api/blogmern', BlogRouter)
app.use('/api/blogadmin', AdminRouter)


require('./Config/DB').dbConnect()




app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))