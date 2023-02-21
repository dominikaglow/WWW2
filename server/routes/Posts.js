const express = require('express');
const router = express.Router();
const {Posts} = require('../models')
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");


router.get("/", async (req, res) => {
    //get all posts from table Posts
    const lisOfPosts = await Posts.findAll();
    res.json(lisOfPosts);
});

/*route to specific id page*/
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    /*The findByPk method obtains only a single entry from the table, using the provided primary key.
    /*Returns row from database*/
    const post = await Posts.findByPk(id)
    res.json(post);
});


/*ENDPOINTS GET AND POST*/
/*insert data into database*/
router.post("/", async (req, res) => {
    /*access data*/
    const post = req.body;
    /*insert post into database*/
    await Posts.create(post); /*posts is a table in database*/
    //async and await to wait for user to enter data and after that continue
    res.json(post); /*returning response from query*/
});

module.exports = router;