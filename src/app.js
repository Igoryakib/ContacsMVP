const { urlencoded } = require('express');
const express = require('express');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    })
});

module.exports = app;