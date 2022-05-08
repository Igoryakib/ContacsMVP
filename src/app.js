const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const {nanoid} = require('nanoid');

const app = express();

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

let contacts = [];
/**
 * {
 *   id, name, phone, address
 * }
 */

app.get('/', (req, res) => {
    res.render('index', {
        contacts,
    });
});

// GET /create - render create.ejs
app.get('/create', (req, res) => {
    res.render('create');
})

// POST /create
app.post('/create', (req, res) => {
    contacts.push({
        ...req.body,
        id: nanoid(),
    })
    res.redirect('/')
});

// GET /delete/:contactId 
app.get('/delete/:contactId', (req, res) => {
    const {contactId} = req.params;
    contacts = contacts.filter(item => item.id !== contactId);
    res.redirect('/');
});

// GET /contact/:contactId
app.get('/contact/:contactId', (req, res) => {
    const {contactId} = req.params;
    const contact = contacts.find(item => item.id === contactId);
    res.render('details', {
        contact,
    })
})

module.exports = app;