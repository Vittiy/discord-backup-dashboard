const path = require("path"),
    configuration = require('../config/configuration'),
    credentials = require('../config/credentials'),
    bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    session = require("express-session"),
    dataDir = path.resolve(`${process.cwd()}${path.sep}src`),
    templateDir = path.resolve(`${dataDir}${path.sep}views`);

app
    // Body parser (for post method)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    // Set the engine to html (for ejs template)
    .engine("html", require("ejs").renderFile)
    .set("view engine", "ejs")
    // Set the ejs templates to ./views
    .set("views", templateDir)
    // Set the dashboard port
    .set("port", configuration.port)
    // Set the express session password and configuration
    .use(session({secret: credentials.sessionSecret, resave: false, saveUninitialized: false}))


app.listen(configuration.port, function () {
    console.log(`running on port ${configuration.port}`);
}).on("error", (err) => {
    console.log("ERROR", `Error with starting webiste server: ${err.code}`);
    return process.exit(0);
});