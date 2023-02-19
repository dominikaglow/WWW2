/*funkcja do weryfkacji czy dane sa poprawne*/
const {verify} = require("jsonwebtoken");

/*next - function to use when u want to move forward*/
/*to bedzie wykonane przed wykonaniem requesta*/
const validateToken = (req, res, next) => {
    /*grab token from frontend*/
    const accessToken = req.header("accessToken");

    /*sprawdzenie czy uzytkownik chce dodac komentarz bez wczesniejszego zalogowania*/
    if (!accessToken) return res.json({error: "User is not logged in."});

    try{
        //validToken przechowuje username oraz haslo
        const validToken = verify(accessToken, "securerandomword");
        //req.user bedzie widoczne we wszystkich plikach w ktorych jest validateToken uzyte
        req.user = validToken;
        if (validToken){
            return next();
        }
    }catch (err){
        return res.json({error: err});
    }
};


/*eksportujemy zeby miec do tego wszedzie dostep*/
module.exports = {validateToken};