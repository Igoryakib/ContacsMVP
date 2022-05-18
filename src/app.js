const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const {nanoid} = require('nanoid');
const fs = require('fs').promises;

const app = express();

app.set('views', path.join(process.cwd(), 'views'));
const contactsPath = path.join(process.cwd(), 'db/contacts.json');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


/**
 * {
 *   id, name, phone, address
 * }
 */

const findAll = async () => {
    const allContacts = JSON.parse(await fs.readFile(contactsPath));
    return allContacts;
};

const create = async ({name, phone, address}) => {
    const newContact = {
        id: nanoid(),
        name,
        phone,
        address,
    }

    const allContacts = await findAll();
    allContacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
};

const deleteContact = async (contactId) => {
    let allContacts = await findAll();
    allContacts = allContacts.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
};

const findById = async (contactId) => {
    const allContacts = await findAll();
    return allContacts.find(item => item.id === contactId);
};

app.get('/', async (req, res) => {
    res.render('index', {
       contacts: await findAll(),
    });
});

// GET /create - render create.ejs
app.get('/create', (req, res) => {
    res.render('create');
})

// POST /create
app.post('/create', async (req, res) => {
    await create(req.body);
    res.redirect('/')
});

// GET /delete/:contactId 
app.get('/delete/:contactId', async (req, res) => {
    const {contactId} = req.params;
    await deleteContact(contactId);
    res.redirect('/');
});

// GET /contact/:contactId
app.get('/contact/:contactId', async (req, res) => {
    const {contactId} = req.params;
    const contact = await findById(contactId);
    if(!contact) {
      res.redirect('/404');
      return;
    }
    res.render('details', {
        contact,
    })
});

app.get('/404', (req, res) => {
    res.render('notFound');
})

module.exports = app;