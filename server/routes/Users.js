const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcryptjs = require("bcryptjs");
const {sign} = require('jsonwebtoken'); /*sign - function that creates the token*/


/*insert data into database*/
router.post("/", async (req, res) => {
    const {username, password} = req.body;
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

    /* get user based on username */
    const user = await Users.findOne({where: {username: username}});

    /* if used  does not exists... */
    if (!user) {
        return res.json({error: "User doesn't exist."});
    }

    bcryptjs.compare(password, user.password).then((match) => {/* user.password - password from database */
       if (!match) {
           return res.json({error: "Wrong password!"});
       }

       //create token
       const accessToken = sign(
            {username: user.username, id: user.id},
            "securerandomword"
       );

       res.json({token: accessToken, username: username, id: user.id});
    });
});

module.exports = router;

