const express = require('express');
const bodyParser = require('body-parser');
const {sumArray, plug} = require('./utils');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  res.status(200).send({
    result: req.body.a + req.body.b,
  });
});

app.post('/product', (req, res) => {
  const {a, b} = req.body;
  const r = a*b;
  res.status(200).send({
    result: r
  });
});

app.post('/sumArray', (req, res) => {
  var {array, num} = req.body;
  var r = sumArray(array, num); 
  res.status(200).send({
    result: r
  });
});

app.post('/numString', (req, res) => {
  var r = req.body.s
  if(!r) return res.sendStatus(200)
  //if(r === "") return res.sendStatus(400)
  //if(typeof r === "number") return res.sendStatus(400)
  var result = r.length
  res.status(200).send({
    result,
  });
});

app.post('/plug', (req, res) => {
  if(!req.body.prop) return res.sendStatus(200)
  var {array, prop} = req.body;
  if(!Array.isArray(array)) return res.sendStatus(400)
  if(prop === "") return res.sendStatus(400)
  //if(typeof r === "number") return res.sendStatus(400)
  var result = plug(array, prop)
  res.status(200).send({
    result,
  });
});

app.listen(3000);

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

