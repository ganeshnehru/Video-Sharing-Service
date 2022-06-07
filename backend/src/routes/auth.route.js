const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// USER Signup
router.post(
    '/user/signup',
    passport.authenticate('userSignup', {session:false}),

    async(req, res, next) => {

        console.log("\nUSER Signup successful for: " , req.user.username)
        res.status(200).send({
            message:'Signup Successful',
            user:req.user
        });
    }
);


// USER Login with 'username' and 'password'
router.post(
    '/user/login',

    async(req, res, next) => {
        passport.authenticate(
            'userLogin',
            async (err, user, info) => {
                try{
                    if(err || !user){
                        const error = new Error('An Error Occurred');

                        res.status(400).send("Wrong username/password combination");
                        return next("\nWrong username/password combination");
                        //return next(error);
                    }

                    req.login(
                        user, 
                        {session:false},

                        async(error) => {
                            if(error) return next(error);

                            const body = {_id:user._id, username:user.username, name:user.name, subscribed:user.subscribed};
                            const token = jwt.sign({user:body}, 'TOP_SECRET' , {
                                expiresIn: 1008000
                            });

                            // return res.json({
                            //     token:token,
                            //     user:user.username,
                            //     message:'Login Successful'
                            // });
                            console.log("\nUSER Login Successful for: ", user.username);
                            return res.status(200).send({token});
                        }
                    );
                }
                catch(error){
                    return next(error);
                }
            }
        )(req, res, next);
    }
)


// CREATOR Signup
router.post(
    '/creator/signup',
    passport.authenticate('creatorSignup', {session:false}),

    async(req, res, next) => {

        console.log("\nCREATOR Signup successful for: " , req.user.username)
        res.status(200).send({
            message:'Signup Successful',
            user:req.user
        });
    }
);


// CREATOR Login with 'username' and 'password'
router.post(
    '/creator/login',

    async(req, res, next) => {
        passport.authenticate(
            'creatorLogin',
            async (err, user, info) => {
                try{
                    if(err || !user){
                        const error = new Error('An Error Occurred');

                        res.status(400).send("Wrong username/password combination");
                        return next("\nWrong username/password combination");
                        //return next(error);
                    }

                    req.login(
                        user, 
                        {session:false},

                        async(error) => {
                            if(error) return next(error);

                            const body = {_id:user._id, username:user.username};
                            const token = jwt.sign({user:body}, 'TOP_SECRET' , {
                                expiresIn: 1008000
                            });

                            // return res.json({
                            //     token:token,
                            //     user:user.username,
                            //     message:'Login Successful'
                            // });
                            console.log("\nCREATOR Login Successful for: ", user.username);
                            return res.status(200).send({token});
                        }
                    );
                }
                catch(error){
                    return next(error);
                }
            }
        )(req, res, next);
    }
)

module.exports = router;