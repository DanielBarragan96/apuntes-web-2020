const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Statics
app.use(express.static(__dirname + '/public')); //darle prioridad a esta parte
app.use(express.json);

//Middleware
function log(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}: ${new Date(Date.now()).toString()}`);
    //obtener algún header
    console.log("Content-Type", req.get('Content-Type'));
    next(); //ejecuta la siguiente función 
}

function authChecker(req, res, next) {
    console.log('checking auth ...');
    let id = req.get('x-auth');
    if (id) {
        req.id = id;
        next();
    } else {
        res.status(401).send('missing x-auth header');
    }
}

app.use(log);

//Router
const productsRouter = require('./routes/productsRoutes');
app.use('/products', authChecker, productsRouter);
const drinksRouter = require('./routes/drinksRoute');
app.use('/drinks', drinksRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})