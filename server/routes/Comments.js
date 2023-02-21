const express = require("express");
const router = express.Router();
const {Comments, Posts} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: {postId: postId}});
    res.json(comments);
});

/*create comments*/
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username; /*storing the username from AuthMiddleware*/
    comment.username = username; /*adding username to comment object*/
    await Comments.create(comment); /*Comments is a table*/
    res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});

module.exports = router;