const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcryptjs = require("bcryptjs");
/*sign - function that creates the token*/
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

/*ENDPOINTY GET I POST*/
/*insert data into database*/
router.post("/", async (req, res) => {
    /*za kazdym razem gdy to wywolujemy bedziemy wysylac obiekt zawierajacy username i password*/
    const {username, password} = req.body;
    /*haszowanie podanego przez uzytkownika hasla*/
    //w haszowaniu chodzi o to, ze funkcja haszujaca dziala tylko w jedna strone. Zeby potem sprawdzic
    //czy dany uzytkownik istnieje haszujemy podane przy logowaniu haslo i porownujemy zahaszowane stringi
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

   /*sprawdzanie czy podany username istnieje w tabeli*/
    /*bo nie mozemy uzyc tej nazwy jesli nie ma jej w tabeli*/

    /*grab me a user where username is username*/
    /*jesli takiego usera nie ma to user bedzie pusty*/
    const user = await Users.findOne({where: {username: username}});

    if (!user) {
        return res.json({error: "User doesn't exist."});
    }

    /*user.password - haslo z bazy danych*/
    /*match to funkcja*/
    bcryptjs.compare(password, user.password).then((match) => {
       if (!match) {
           return res.json({error: "Wrong password!"});
       }

       const accessToken = sign(
            {username: user.username, id: user.id},
            "securerandomword"
       );
       /*data that we wanna keep secure is argument in sign*/
       res.json(accessToken);
    });
});

/*zapobieganie przed fake tokens*/
//wukorzystywane w App.js w useEffect
router.get('./auth', validateToken, (req, res) => {
    res.json(req.user);
});
module.exports = router;

