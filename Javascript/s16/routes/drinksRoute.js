'use strict';
const express = require('express');
const router = express.Router();
const DRINKS = require('../data/drink');

router.get('/', (req, res) => {
    res.send(DRINKS);
});
router.post('/', (req, res) => {
    console.log(req.body);
    let drink = {};
    Object.assign(drink, req.body);
    drink.id = Math.round(Math.random());
    DRINKS.push(drink);
    res.send(drink);
});
router.get('/:id', (req, res) => {
    res.send(DRINKS.find(el => el.id === req.params.id));
});
router.put('/:id', (req, res) => {
    let index = DRINKS.findIndex(el => el.id === req.params.id);
    DRINKS[index] = req.body;
    res.send(req.body);
});
router.delete('/:id', (req, res) => {
    let index = DRINKS.findIndex(el => el.id === req.params.id);

    if (index > -1) {
        DRINKS.splice(index, 1);
    }
    res.send('done');
});
module.exports = router;