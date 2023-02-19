const express = require("express");
const router = express.Router();
const {Comments, Posts} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    /*The findByPk method obtains only a single entry from the table, using the provided primary key.
    /*Returns row from database*/
    /*Generates SELECT queries*/
    const comments = await Comments.findAll({where: {postId: postId}});
    res.json(comments);
});

/*create comments*/
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    /*storing the username*/
    const username = req.user.username;
    /*dodawanie username do obiektu comment*/
    comment.username = username;
    await Comments.create(comment); /*Comments to tabela w mysql*/
    // /*async i await zeby poczekac na wprowadzenie danych zanim przejdzie sie dalej*/
    res.json(comment); /*zwracanie odpowiedzi z zapytania */
});

module.exports = router;