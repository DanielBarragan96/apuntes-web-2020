'use strict';
const express = require('express');
const router = express.Router();
const PRODUCTS = require('../data/products');
router.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(PRODUCTS));
});
router.get('/:id', (req, res) => {
    if (req.get('x-auth') != undefined) {
        res.set('x-id', req.params.id);
        res.send(PRODUCTS.find(ele => ele.id === req.params.id));
    } else {
        res.status(400).send({
            error: 'falta x-auth'
        });
    }
})

module.exports = router;