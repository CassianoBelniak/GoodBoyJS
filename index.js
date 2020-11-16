const express = require("express");
const app = express();
const path = require("path");
const sass = require("node-sass");
var http = require("http");
var reload = require("reload");
var watch = require('watch')
const sassMiddleware = require("node-sass-middleware");
const pug = require('pug');

const routes = require("./src/pages/routes");
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/src/pages"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000);
app.locals.basedir = 'c:/git/GoodBoyJS'
app.globals = ['/lib/good-boy.pug']

app.use(
  sassMiddleware({
    src: __dirname + "/src",
    dest: __dirname + "/public",
    debug: true,
  })
);

var server = http.createServer(app);

app.use(routes);
//app.listen(3000);

reload(app)
  .then(function (reloadReturned) {
    server.listen(app.get("port"), function () {
      console.log("Web server listening on port " + app.get("port"));
    });
    watch.watchTree(__dirname + "/src", function (f, curr, prev) {
      reloadReturned.reload();
    });
  })
  .catch(function (err) {
    console.error(
      "Reload could not start, could not start server/sample app",
      err
    );
  });
