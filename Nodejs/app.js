// // // Forma para vanila node
// const fs = require('fs');
// let users = JSON.parse(fs.readFileSync('./data/users.json'));
// console.table(users);
// console.log(users[1].carrera);

// // // Forma con Express
"use strict";
const express = require("express");
const app = express();
//const app = require('express'); //esto es lo mismo que las 2 anteriores lineas
const PORT = process.env.PORT || 3000;
const fs = require("fs");
let myHTML = fs.readFileSync("index.html");

const USERS = require("./data/users.json");

app.get("/", (req, res) => {
  res.send("Hello DASworld");
});

app.route("/home").get((req, res) => {
  res.send("Welcome home");
});

app.route("/usuarios").get((req, res) => {
  res.send(USERS);
});

app.route("/usuarios/:id").get((req, res) => {
  let user = {};
  user = USERS[req.params.id];
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`Ecpress app listening on port ${PORT}`);
});
