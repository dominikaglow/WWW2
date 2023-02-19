const express = require('express');
const router = express.Router();
const {Posts} = require('../models')
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");


router.get("/", async (req, res) => {
    const lisOfPosts = await Posts.findAll();
    res.json(lisOfPosts);
});

/*route to specific id page*/
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    /*The findByPk method obtains only a single entry from the table, using the provided primary key.
    /*Returns row from database*/
    /*Generates SELECT queries*/
    const post = await Posts.findByPk(id)
    res.json(post);
});


/*ENDPOINTY GET I POST*/
/*insert data into database*/
router.post("/", async (req, res) => {
    /*access data*/
    const post = req.body;
    /*insert post into database*/
    await Posts.create(post); /*posts to tabela w mysql*/
    /*async i await zeby poczekac na wprowadzenie danych zanim przejdzie sie dalej*/
    res.json(post); /*zwracanie odpowiedzi z zapytania */
});

module.exports = router;