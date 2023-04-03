const getIndexPage = (req,res) => {
    res.render("index", {
        link: "index"
    });
}

const getAboutPage = (req, res) => {
    res.render('about', {
        link: "about"
    });
}

const getRegister = (req, res) => {
    res.render('register', {
        link: 'register' 
    })
}

const getLogin = (req,res) => {
    res.render("login", {
        link: "login"
    } ) 
}
const getLoguot = (req, res) => {
    res.cookie("JWEBToken", "", {
        maxAge: 1
    });
    res.redirect("/");
}

export {getAboutPage, getIndexPage, getRegister, getLogin, getLoguot}