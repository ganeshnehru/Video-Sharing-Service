const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model');
const CreatorModel = require('../models/creator.model');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// USER 

// Saves the sign up information to the database
passport.use(
    'userSignup',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password',
            passReqToCallback:true
        },

        async(req, username,password, done) => {
            try{
                const email = req.body.email;
                const name = req.body.name;
                const creditcard = req.body.creditcard;
                const following = [];
                const subscribed = false;

                const user = await UserModel.create({username, password, email, name, creditcard, following, subscribed});

                return done(null, user);
            }
            catch(error){
                return done(error);
            }
        }
    )
)

// Login and authenticates
passport.use(
    'userLogin',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
    
        }, 

        async(username, password, done) => {
            try{
                const user = await UserModel.findOne({username:username});

                if(!user){
                    return done(null, false, {message: 'User does not exist'});
                }

                const validate = await user.isValidPassword(password);

                if(!validate){
                    return done(null, false, {message: 'Wrong Password'});
                }

                return done(null, user, {message: 'User Login Successful'});
            }
            catch(error){
                return done(error);
            }
        }
    )
);


// CREATOR

// Saves the sign up information to the database
passport.use(
    'creatorSignup',
    new localStrategy(
        {
            usernameField:'username',
            passwordField:'password',
            passReqToCallback:true
        },

        async(req, username,password, done) => {
            try{
                const email = req.body.email;
                const name = req.body.name;
                const creditcard = req.body.creditcard;
                const followers = [];
                const content = [];

                const creator = await CreatorModel.create({username, password, email, name, creditcard, followers, content});

                return done(null, creator);
            }
            catch(error){
                return done(error);
            }
        }
    )
)

// Login and authenticates
passport.use(
    'creatorLogin',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
    
        }, 

        async(username, password, done) => {
            try{
                const creator = await CreatorModel.findOne({username:username});

                if(!creator){
                    return done(null, false, {message: 'Creator does not exist'});
                }

                const validate = await creator.isValidPassword(password);

                if(!validate){
                    return done(null, false, {message: 'Wrong Password'});
                }

                return done(null, creator, {message: 'Creator Login Successful'});
            }
            catch(error){
                return done(error);
            }
        }
    )
);


// Verify Token
passport.use(
    new JWTStrategy(
        {
            secretOrKey:'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try{
                return done(null, token.user);
            }
            catch(error){
                done(error);
            }
        }
    )
)