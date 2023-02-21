module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        /*defining columns*/
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    /*associate post to comments*/
    /*create a One-To-Many association between two Sequelize models*/
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            /*when we delete post, all comments asssociated with this post will be also removed from database*/
            onDelete: "cascade",
        });
    };
    return Posts;
};