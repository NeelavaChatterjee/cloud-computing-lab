const path = require("path");
const express = require('express')
const hbs = require("hbs");
require('./db/mongoose')

const diaryRouter = require('./routers/diary')

const app = express()
const port = process.env.PORT || 3000

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

app.use(express.json())
app.use(diaryRouter)

app.get("", (req, res) => {
    res.render("index", {
        title: "Personal Diary",
        name: "Neelava Chatterjee"
    });
});

app.get("/new", (req, res) => {
    res.render("creatediaryentry", {
        title: "Create new Diary Entry",
        name: "Neelava Chatterjee"
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
    console.log('Server is up on port ' + port)
})