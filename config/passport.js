const LocalStrategy = require('passport-local');
const User = require('../model/User.js')
const bcrypt = require('bcrypt');

const initializingPassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
    },
        async function (email, password, done) {
            try {
                const user = await User.findOne({ email });

                if (!user) done(null, false, { message: 'Incorrect username or password' });
                const isSame = await bcrypt.compare(password, user.password);
                if (!isSame) done(null, false, { message: 'Incorrect username or password' });
                return done(null, user);
            } catch (error) {
                return done(error, false, { message: 'Incorrect username or password' });
            }

        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (error) {
            done(error, false)
        }

    });
}

module.exports = initializingPassport;