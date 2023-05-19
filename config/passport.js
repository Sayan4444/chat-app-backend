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

                if (!user) done(null, false);
                const isSame = await bcrypt.compare(password, user.password);
                if (!isSame) done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error, false);
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