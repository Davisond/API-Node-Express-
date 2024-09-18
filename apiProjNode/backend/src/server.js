const app = require('./app'); //importa o app
require('dotenv').config();

const PORT = process.env.PORT || 3333; //aplicação vai rodar na variavel de ambiente port, se não existir inicia em 3333

app.listen(PORT, () => console.log(`running on port ${PORT}`)); //deixa o ngc rodando com callback 
//Botando pra rodar:   node src/index.js  (verificar onde foi parar meu callback)

