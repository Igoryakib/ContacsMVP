const { urlencoded } = require('express');
const express = require('express');
const path = require('path');

const app = express();

const contactsRouter = require('./routes/contacts.js');
const callsRouter = require('./routes/calls.js');

const logHello = (req, res, next) => {
    console.log('hello');
    next();
};

// app.use(express.static(path.join(process.cwd(), './public')))
app.use(logHello);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended: false}));
app.use('/contacts', contactsRouter);
app.use('/calls', callsRouter);
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    })
});

app.get('/about', (req, res) => {
    res.render('about-us', {
        title: 'About us',
    })
});

// Url Params 
app.get('/contacts/:contactsId', (req, res) => {
    console.log(req.params.contactsId);
    res.send(`user info for id ${req.params.contactsId}`)
});


// Request body 
app.post('/contacts', (req, res) => {
    res.json(req.body)
});

app.post('/contacts-form', (req, res) => {
    res.json(req.body)
});

// Search contacts 

app.get('/contacts', (req, res) => {
    res.json(req.query)
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/`);
});