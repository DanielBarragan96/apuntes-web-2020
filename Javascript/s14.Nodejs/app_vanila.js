const http = require('http'); //import javax.http
const HOSTNAME = '127.0.0.1'; //no se recomienda modificarlo
//const PORT = 3000;//Tambien puede ser process.env.PORT para evaluar si existe ese PORT
const PORT = process.env.PORT || 3000;
const fs = require('fs');
let myHTML = fs.readFileSync('index.html');

const server = http.createServer((req, res) => {
    res.statusCode = 200; //es el codigo de OK
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello world\n'); //contenido de respuesta
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(myHTML);
    res.end(); //contenido de respuesta
});

server.listen(PORT, HOSTNAME, () => { //inicializar servidor
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})