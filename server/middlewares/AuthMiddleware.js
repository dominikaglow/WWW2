/*function to verify if data is valid*/
//JWT is a method of safe data transfer between between server and client
//It works by creating a token and sending it to client.
const {verify} = require("jsonwebtoken");

/*next - function to use when you want to move forward*/
/*it will be executed before request*/
const validateToken = (req, res, next) => {
    /*grab token from frontend*/
    const accessToken = req.header("accessToken");

    //checking if user wants to add comment before logging in
    if (!accessToken) return res.json({error: "User is not logged in."});

    try{
        //validToken stores username and password
        const validToken = verify(accessToken, "securerandomword");
        //req.user will be visible in all files, requests where validateToken is used
        req.user = validToken;
        if (validToken){
            return next();
        }
    }catch (err){
        return res.json({error: err});
    }
};


/*we export this to have access to this in other files*/
module.exports = {validateToken};