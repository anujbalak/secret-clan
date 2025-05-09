import express from 'express';
import 'dotenv/config'
import path from 'node:path'
import url from 'node:url'
import passport from 'passport';
import session from 'express-session';

import indexRouter from './routes/indexRouter.js';
import registrationRouter from './routes/registrationRouter.js';
import signInRouter from './routes/sign-inRouter.js';
import { getAllMessages, getAllMessagesAndUsernames, getUserById } from './db/queries.js';
import local from './passport/localStrategy.js';
import logOutRouter from './routes/log-outRouter.js';
import newMessageRouter from './routes/newMessageRouter.js';
import memberRouter from './routes/memberRouter.js';
import messageRouter from './routes/messageRouter.js';
import accountRouter from './routes/accountRouter.js';


const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolder = path.join(__dirname, 'views');


app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', viewsFolder)
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))
app.use(passport.session());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(async (req, res, next) => {
    const allMessages = await getAllMessagesAndUsernames();
    res.locals.messages = allMessages;
    next();
})
app.use('/', indexRouter);
app.use('/registration', registrationRouter)
app.use('/sign-in', signInRouter);
app.use('/log-out', logOutRouter);
app.use('/new-message', newMessageRouter)
app.use('/member', memberRouter)
app.use('/message', messageRouter);
app.use('/account', accountRouter);

passport.use(local)
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id)
        done(null, user)
    } catch (err) {
        done(err);
    }
})

app.listen(process.env.PORT, () => console.log('App listening at port', process.env.PORT))