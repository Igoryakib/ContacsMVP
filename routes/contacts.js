const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('server is working');
});

// Url Params 
router.get('/:contactsId', (req, res) => {
    console.log(req.params.contactsId);
    res.send(`user info for id ${req.params.contactsId}`)
});


// Request body 
router.post('/contacts', (req, res) => {
    res.json(req.body)
});

router.post('/form', (req, res) => {
    res.json(req.body)
});

// Search contacts 

router.get('/contacts', (req, res) => {
    res.json(req.query)
})