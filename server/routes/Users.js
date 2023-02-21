const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcryptjs = require("bcryptjs");
/*sign - function that creates the token*/
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

/*insert data into database*/
router.post("/", async (req, res) => {
    const {username, password} = req.body;
    /*hash the password*/
    //hash - hashed password
    bcryptjs.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("success");
    });
});

router.post("/login", async (req, res) => {
   const {username, password} = req.body;


    //check if given username exists in database
    /*grab a user where username is username*/
    /*if the username doesnt exit the username value will be empty*/
    const user = await Users.findOne({where: {username: username}});

    if (!user) {
        return res.json({error: "User doesn't exist."});
    }

    /*user.password - password from database*/
    bcryptjs.compare(password, user.password).then((match) => {
       if (!match) {
           return res.json({error: "Wrong password!"});
       }

       //create token
       //data that we want to keep secure is an argument in sign
       const accessToken = sign(
            {username: user.username, id: user.id},
            "securerandomword"
       );
       // because of that we have access to token in frontend
       res.json({token: accessToken, username: username, id: user.id});
    });
});

/*prevent fake tokens*/
//used in App.js in useEffect
router.get('./auth', validateToken, (req, res) => {
    res.json(req.user);
});
module.exports = router;

