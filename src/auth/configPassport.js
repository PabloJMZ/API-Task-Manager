const LocalStrategy = require('passport-local').Strategy;

function configPassport(passport, User){
    passport.use('SignIn',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if(!user){
                return done(null, false, req.flash('messageSignIn', 'nombre de usuario no registrado'));
            }else if(user.password != password){
                return done(null, false, req.flash('messageSignIn', 'contraseña incorrecta'));
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.use('SignUp',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if(user){
                return done(null, false, req.flash('messageSignUp', 'Nombre de usuario no disponible'));
            }
            const { email } = req.body;
            const newUser = new User({username, password, email});
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({_id: id});
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = configPassport;