
const express = require('express');
const {Good, valiateGood} = require('../models/Good');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = valiateGood(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const good = new Good(req.body);
    await good.save();

    res.send(good);
});

router.put('/:id', async (req, res) => {

});

router.get('/', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});


module.exports = router;