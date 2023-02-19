module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        /*definiowanie kolumn*/
        title: {
            type: DataTypes.STRING,
            allowNull: false /*tytul nie moze byc nullem*/
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false /*postText nie moze byc nullem*/
        },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false /*userName nie moze byc nullem*/
        // },
    });
    /*associate post to comments*/
    /*kazdy post moze miec wiele komentarzy*/
    /*create a One-To-Many association between two Sequelize models*/
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            /*gdy usune post to usuna sie tez komentarze*/
            onDelete: "cascade",
        });
    };
    return Posts;
};