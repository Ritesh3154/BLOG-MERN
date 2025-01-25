exports.matchLogin = (req, res, path) => {
    const cookieData = req?.cookies?.admin

    console.log("req///////////////////////")
    console.log(req.cookie)
    if (!cookieData) {
        res.redirect('/login')
    } else {
        res.render(path)
    }
}