'use strict';
const {
    log
} = require('console');
const express = require('express');
const UsersController = require('../controllers/usersController');
const usersCtrl = new UsersController();
const router = express();

router.post('/', (req, res) => {
    let b = req.body;
    if (b.nombre && b.apellidos && b.email && b.sexo && b.fecha) {
        let u = usersCtrl.getUniqueUser(b.nombre, b.apellidos, b.email);
        console.log(u);
        if (u) {
            res.status(400).send('user already exists');
        } else {
            res.status(201).send(usersCtrl.insertUser(b));
        }
    } else {
        res.status(400).send('missing arguments');
    }
});

router.get('/', (req, res) => {
    let userCtrl = new UsersController();
    userCtrl.getList(users => {
        if (req.query.name || req.query.lastname) {
            let nom = (req.query.name) ? req.query.name : '';
            let ap = (req.query.lastname) ? req.query.lastname : '';
            users = users.filter((ele, index, arr) => {
                let isMatch = true;
                if (nom) {
                    isMatch &= ele.nombre.toUpperCase().includes(nom.toUpperCase())
                }
                if (ap) {
                    isMatch &= ele.apellidos.toUpperCase().includes(ap.toUpperCase())
                }
                return isMatch;
            });
        }
        if (req.query.page) {
            let limit = (req.query.limit) ? parseInt(req.query.limit) : 5;
            let page = parseInt(req.query.page) * limit - limit;
            users = users.slice(page, page + limit);
        } else {
            users = users.slice(0, 0 + 5);
        }
        if (req.query.date) {
            users = users.filter(ele => new Date(ele.fecha).getTime() === new Date(req.query.date).getTime());
        }

        users = users.map((val, index, arra) => {
            return {
                "nombre": val.nombre,
                "apellidos": val.apellidos,
                "email": val.email,
                "uid": val._id
            }
        });
        res.send(users);
    });
});

router.get('/:email', (req, res) => {
    let userCtrl = new UsersController();
    let users = userCtrl.getList();
    if (req.params.email) {
        users = users.find(ele => ele.email === req.params.email);
        if (users) {
            res.send(users);
        } else {
            res.set('Content-Type', 'application/json');
            res.status(204).send({});
        }
    } else {
        res.status(400).send('missing params');
    }
});
router.put('/:email', (req, res) => {
    let b = req.body;
    if (req.params.email && (b.nombre || b.apellidos || b.password || b.fecha)) {
        let u = usersCtrl.getUserByEmail(b.email);
        if (u) {
            b.uid = u.uid;
            Object.assign(u, b);
            res.status(200).send(usersCtrl.updateUser(u));
        } else {
            res.status(404).send('user does not exist');
        }
    } else {
        res.status(400).send('missing arguments');
    }
});

router.delete('/:email', (req, res) => {
    if (req.params.email) {
        let u = usersCtrl.getUserByEmail(req.params.email);
        if (u) {
            res.status(200).send({
                "deleted": usersCtrl.deleteUser(u)
            });
        } else {
            res.status(404).send('user does not exist');
        }
    } else {
        res.status(400).send('missing arguments');
    }
});
module.exports = router;