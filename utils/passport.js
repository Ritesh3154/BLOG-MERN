
const Admin = require('../Model/AdminModel')
const { hashToPlain } = require('./password')

const LocalStrategy = require('passport-local').Strategy
module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return done(null, false, console.log("user not found"))
        }

        const match = await hashToPlain(password,admin.password)
        if (!match) {
            return done(null, false, console.log("password not match"))
        }
        return done(null, admin)

    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);//to store user id in session
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await Admin.findById(id)
            done(null, admin)//retrieve full user oject
        } catch (error) {
            console.log(error)
        }
    });
}