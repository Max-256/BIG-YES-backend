
const express = require('express');
const {Good, valiateGood} = require('../models/Good');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const {error} = valiateGood(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const good = new Good(req.body);
    await good.save();

    res.send(good);
});

router.put('/:id', auth, async (req, res) => {
    const good = await Good.findById(req.params.id);
    if(!good) return res.status(404).send('Product not found');

    const {error} = valiateGood(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    good.set(req.body);
    await good.save();
    res.send(good);    
});

router.get('/', async (req, res) => {
    const goods = await Good.find().sort("-datePosted");
    res.send(goods);
});

router.get('/:id', async (req, res) => {
    const good = await Good.findById(req.params.id);
    if(!good) return res.status(404).send('Product not found');

    res.send(good);
});

router.delete('/:id', auth, async (req, res) => {
    const good = await Good.findById(req.params.id);
    if(!good) return res.status(404).send("Product not found!");

    await Good.deleteOne({"_id": req.params.id});
    res.send(good);
});

module.exports = router;