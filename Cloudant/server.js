'use strict';
const fs = require('fs');
const express = require('express');
const app = express();
const randomize = require('randomatic');
const jwt = require('jsonwebtoken');
//load middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const usersRouter = require('./routes/usersRoutes');
const UsersController = require('./controllers/usersController');
const PORT = process.env.PORT || 3000;
const SECRET_JWT = 'I3s@2020';

async function authentication(req, res, next) {
    let xauth = req.get('x-auth-user');
    // console.log(xauth);
    if (xauth && xauth.split('.').length > 1) {
        try {
            let token = jwt.verify(xauth, SECRET_JWT);
            let id = token.uid;
            let userctrl = new UsersController();
            let user = await userctrl.getUser(id);
            // console.log(user);
            if (user && user.token === xauth) {
                next();
            } else {
                res.status(401).send('Not authorized');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(401).send('Not authorized');
    }

}
app.use('/api/users', authentication, usersRouter);
app.post('/api/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let uctrl = new UsersController();
        // let pass = bcryp.hash(req.body.password,5);
        // let user = await uctrl.getUserByCredentials(req.body.email,pass);
        let user = await uctrl.getUserByCredentials(req.body.email, req.body.password);
        // user.password === pass
        if (user) {
            // let token = randomize('Aa0','10')+"-"+user.uid;
            let token = jwt.sign({
                "uid": user._id
            }, SECRET_JWT);
            user.token = token;
            // console.log(user);
            let uuser = await uctrl.updateUser(user);
            console.log(uuser);
            res.status(200).send({
                "token": token
            });
        } else {
            res.status(401).send('Wrong credentials');
        }
    } else {
        res.status(400).send('Missing user/pass');
    }
});
app.get('/', (req, res) => {
    res.send('Users app práctica 4');
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})