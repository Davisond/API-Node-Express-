const express = require('express'); //importa o express
const router = require('./router'); //importa o arquivo de rota

const app = express(); //criado app


app.use(express.json());  //use
app.use(router);     //use


module.exports = app; //exporta o app
