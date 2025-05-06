import pLocal from 'passport-local'
import { getUserByEmail } from '../db/queries.js';
import bcrypt from 'bcryptjs';
const LocalStrategy = pLocal.Strategy;

const local = new LocalStrategy({usernameField: 'email'} ,async (email, password, done) => {
    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return done(null, false, {message: 'User does not exists'});
        }

       const hashedPassword = await bcrypt.compare(password, user.password)

       if (!hashedPassword) {
        return done(null, false, {message: 'Incorrect email or password'})
       }
       return done(null, user)
    } catch (err) {
        return done(err);
    }
});

export default local