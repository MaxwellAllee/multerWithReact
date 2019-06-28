const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Mongo URI
const mongoURI = 'mongodb://localhost/mongouploads';
const conn = mongoose.createConnection(mongoURI);
exports.mong = mongoURI
exports.conn = conn
exports.app = app
const routes = require("./app/router")
app.use(routes)

const port = 5001;
app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));
          // Check if files