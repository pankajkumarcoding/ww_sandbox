const User = require('../models/auth/User');
const UserSession = require('../models/auth/UserSession');
const bcrypt = require('bcrypt');

module.exports = (app) => {

    /**
     * Sign Up
     */
    app.post('/api/accounts/signup',  (req, res, next) => {

        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        if (!firstname || !lastname || !password || !email) {
            let m = [];
            m += firstname ? (lastname ? (email ? (password ? "" : "Password") : "Email") : "Last Name") : "First name";
            return res.send({
                success: false,
                message: m
            })
           
        }

        let n_email = email.toLowerCase();

        User.find({
            n_email
        }, (err, previousUser) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Server error at signup"
                });
            } else if (previousUser.length > 0) {
                return res.send({
                    success : false,
                    message: "Error at signup. User exists."
                });
            } else {
                // Save new user
                const newUser = new User();

                newUser.firstname = firstname;
                newUser.lastname = lastname;
                newUser.email = n_email;
                newUser.password = newUser.generateHash(password);
                newUser.save((err, user) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Error saving user"
                        })
                    }
                   
                    else {
                        return res.send({
                            success: true,
                            message: "Signed up!"
                        })
                    }

                });
            }
        })

    });

    /**
     * Sign In
     */
    app.post('/api/accounts/signin',  (req, res, next) => {

        const {
            email,
            password
        } = req.body;

        if (!password || !email) {
            return res.send({
                success: false,
                message: "Fail!!!!"
            })
        }

        let n_email = email.toLowerCase();

        User.find({
            email : n_email
        }, (err, user) => {

            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Srvr"
                })
            }

            // No user w/ the provided email
            if (user.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid Credentials"
                })
            }

            const usr = user[0];

            // Incorrect Password
            if (!usr.validatePassword(password)) {
                return res.send({
                    success: false,
                    message: "Invalid Credentials"
                });
            }

            // Successful credentials
            let u_session = new UserSession();

            u_session.userId = user._id;
            u_session.save((err, doc) => {

                if (err) {

                    return res.send({
                        success: false,
                        message: "Error: Invalid"
                    });

                }

                // Success
                return res.send({
                    success: true,
                    message : "User Logged in!",
                });
    
            });

        })
        
    });

    /**
     * Verify logged-in session
     */
    app.get('/api/accounts/verify', (req,res,next) => {

        const {token} = req.query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, ses) => {

            if (err) {

                return res.send({
                    success: false,
                    message: "Server Error @ verify"
                });

            }

            if (ses.length != 1) {

                return res.send({
                    success: false,
                    message: "Session Error" 
                })

            } else {

                return res.send({
                    success: true,
                    message: "Verified √"
                });

            }

        });

    });

    /**
     * Log Out
     */
    app.post('/api/accounts/logout', (req, res, next) => {

        const {token} = req.query;

        UserSession.findOneAndUpdate({
            token_id : token,
            isDeleted: false
        }, {
            isDeleted : true
        }, null, (err, ses) => {

            if (err) {
                return res.send({
                    success: false,
                    message: "Server Error @ LogOut"
                });
            }

            if (!ses){
                return res.send({
                    success: false,
                    message: "No Session Found"
                });
            }
            
            // Logged out
            return res.send({
                success: true,
                message: "Logged out"
            });

        });

    });

    app.get('/api/accounts/test', (req,res,next) => {
        console.log("Hello Fromt he Backcendanfd");
    });

}