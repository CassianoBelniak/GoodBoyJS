const express = require('express');
const app = express();
const path = require('path');
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');

const routes = require("./src/routes");

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/src'));
app.set('view engine', 'pug');

app.use(
    sassMiddleware({
        src: __dirname + '/src', 
        dest: __dirname + '/public', 
        debug: true
    })
);

app.use(routes);
app.listen(3000);
console.log("Server running at http://localhost:3000");