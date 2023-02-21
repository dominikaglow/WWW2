const express = require('express');
const router = express.Router();
const {Posts} = require('../models')
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");

/*ENDPOINTS GET AND POST*/

router.get("/", async (req, res) => {
    //get all posts from table Posts
    const lisOfPosts = await Posts.findAll();
    res.json(lisOfPosts);
});

/*route to specific id page*/
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    //Get single entry from the database table, using the provided primary key.
    const post = await Posts.findByPk(id)
    res.json(post);
});


/*insert data into database*/
router.post("/", async (req, res) => {
    const post = req.body;
    /*insert post into database*/
    await Posts.create(post);
    res.json(post); /*returning response from query*/
});

module.exports = router;