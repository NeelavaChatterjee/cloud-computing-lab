const path = require("path");
const express = require("express");
const hbs = require("hbs");
const owlbot = require("owlbot-js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup owlbot with token
const owlbot_token = "3e356a46b3cf903cabac16d590c5d9d67b9e51e2";
var dictionary = owlbot(owlbot_token);

app.get("", (req, res) => {
    res.render("index", {
        title: "Dictionary",
        name: "Neelava Chatterjee"
    });
});

app.get("/meaning", (req, res) => {
    if (!req.query.word) {
        return res.send({
            error: "You must provide a word."
        });
    }

    dictionary.define(req.query.word).then((result) => {
        return res.send({
            result
        });
    }).catch((err) => {
        return res.send({
            error: "Word not found."
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        name: "Neelava Chatterjee", 
        errorMessage: "Error 404. Page not found"
    });
});

app.listen(port, () => {
    console.log("Server running on port: " + port + ".");
});