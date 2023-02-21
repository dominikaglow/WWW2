//express It simplifies the process of building server-side web applications
//and APIs by providing a set of tools and utilities that make it easy to handle
//HTTP requests and responses, manage sessions, and interact with databases and other data sources.
const express = require("express");
const app = express();
const cors = require("cors");

//responsible for parsing any JSON data sent in the request body and making it available in request.body property
app.use(express.json());

// it allows the server to receive requests from a different domain and enables the sharing of data resources
app.use(cors());

//import the database models defined in the models directory
const db = require('./models')

//Routers - manage routes in app
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

