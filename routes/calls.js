const express = require('express');

const router = express.Router();

// BASE URL /calls

// GET /calls
router.get('/', (req, res) => {
    res.json([])
});

// GET /calls/:callId
router.get('/:callId', (req, res) => {
    res.json({});
});

// POST /calls
router.post('/', (req, res) => {
    res.json(req.body)
})

module.exports = router;