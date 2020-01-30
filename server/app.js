const router = require("./src/router/router");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require("express")();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.set("port", process.env.PORT || 5000);

module.exports = app;
