const passport=require('passport')
const localStratergy=require('passport-local')
const FacebookStratergy=require('passport-facebook')
const GoogleStrategy=require('passport-google-oauth20')
const { Users }=require('./db')

passport.use( new localStratergy({
    usernameField: 'email'
}, (username, password, done) => {
    Users.findOne({
        where: {
            email: username
        }
    })
    .then((user) => {
        if (!user) {
            return done(new Error('email invalid'))
        }
        if(user.password != password) {
            return done(null, false)
        }
        done(null, user)
    })
    .catch(done)
}) )

passport.use( new FacebookStratergy({
    clientID: fbID,
    clientSecret: fbSecret,
    callbackURL: 'http://localhost:3000/signin/facebook/callback',
    profileFields: ['emails', 'displayName', 'picture.type(large)']
},
(accessToken, refreshToken, profile, done) => {
    Users.findOrCreate({
        where: {
            email: profile.emails[0].value
        },
        defaults: {
            dp: profile.photos[0].value,
            username: profile.displayName,
            fbAccessToken: accessToken
        }
    })
    .then((user) => {
        console.log(profile)
        done(null, user)
    })
    .catch(done)
}))

passport.use(new GoogleStrategy({
    clientID: GoogleID,
    clientSecret: GoogleStrategy,
    callbackURL: "http://localhost:3000/signin/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    Users.findOrCreate({
        where: {
            email: profile.emails[0].value
        },
        defaults: {
            username: profile.displayName,
            dp: profile.photos[0].value,
            gAccessToken: accessToken
        }
    })
    .then((user) => {
        console.log(profile);
        done(null, user)
    })
    .catch(done)
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    // Users.findOne({
    //     where: {
    //         id: userID
    //     }
    // })
    // .then((user) => done(null, user))
    // .catch(done)
    done(null, user)
  })
  
  module.exports = passport