module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        /*definiowanie kolumn*/
        username: {
            type: DataTypes.STRING,
            allowNull: false /*userName nie moze byc nullem*/
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false /*userName nie moze byc nullem*/
        },
    });
    // Users.associate = (models) => {
    //     Users.hasMany(models.posts, {
    //         /*gdy usune post to usuna sie tez komentarze*/
    //         onDelete: "cascade",
    //     });
    // };
    return Users;
};