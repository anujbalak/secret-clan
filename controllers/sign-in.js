import passport from "passport"
import local from "../passport/localStrategy.js"

export const getSignIn = async (req, res) => {
    if (req.user) {
        return res.redirect('/');
    };
    res.render('pages/sign-in')
}

const postStatus = {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    session: true
}


export const postSignIn = passport.authenticate('local', postStatus);