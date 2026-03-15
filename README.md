    Boa tarde!
    Qualquer dúvida tô a disposição, pode chamar por e-mail mesmo:
    davisonazevedo05@gmail.com  //utiliza esse, eu não vejo o academico

## Dependências:
    express, mysql2, nodemon, dotenv, jsonwebtoken

## Necessário para funcionamento (utilizei extenções no vscode):
    Docker, Mysql



## database necessário:
    CREATE DATABASE IF NOT EXISTS cachorros;

    USE cachorros;

    CREATE TABLE dogos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        status VARCHAR(45) NOT NULL
    );

## Subir Container docker com mysql (com a extenção do vscode ele já aparece ali no canto):
    docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql

## app.js
    const express = require('express');     //importa o express
    const router = require('./router');     //importa o arquivo de rota
    const app = express();                  //criado app
    app.use(express.json());                //use
    app.use(router);                        //use
    module.exports = app;                    //exporta o app

## server.js 
const app = require('./app');               //importa o app
require('dotenv').config();                 //variaveis setadas ficam disponiveis pelo process.env.port
const PORT = process.env.PORT || 3333;      //aplicação roda na ambiente port, se não existir inicia em 3333
app.listen(PORT, () => console.log(`running on port ${PORT}`)); //deixa o ngc rodando com callback 
                                           //Botando pra rodar:   node src/index.js  (verificar onde foi parar meu callback)

## .env     
    aqui são setadas as variáveis com informações de conexão do mysql

## router.js
    executa rotas existentes cuja lógica está em controllers
    importa arquivos necessários
    executa o chamado conforme exemplo:
        router.get('/dogos', dogosController.getDogos); //rota get /dogos, chama dogosController função getDogos

## models 
    arquivos e funções que acessam diretamente o banco de dados

#   connection.js
    //efetua a conexão com as variáveis setadas, os console.log foram colocados para verificar se conectou mesmo

    const connection = mysql.createPool({   //fila de conecções, nome autoexplicativo
    host: process.env.MYSQL_HOST, // process.env é possível graças ao require('dotenv').config();
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DB
});       

#   dogosModel.js 
    //efetua toda a lógica necessária para acessar o banco de dados, aqui tem os comandos para acessar, inserir, deletar ou dar update na tabela do banco, exemplo abaixo:

    //GET 
    const getDogos = async () => { //async pois aguarda(await), connection.execute 'SELECT * FROM dogos' (busca todos na tabela dogos)
        const [dogos] = await connection.execute('SELECT * FROM dogos');
        return dogos;
    } 
   

## controllers 

#    dogosController.js
    //Possui a lógica de cada rota que existe no router, utiliza o modelo (req, res) => {}
    exemplo baixo:
        const getDogos = async (request, response) => {
        const dogos = await dogosModel.getDogos();       //aguarda dogosModel.getDogos()
        return response.status(200).json(dogos);         //retorna status(200)(ok), json com dogos 
    }

    
## middlewares


#   dogosMiddleware.js
    possui funções de validação e autorização
    exemplo:
        const validateBody = (request, response, next) => {        //funcao valida requisição
    const { body } = request;          
                                   //função valida se 'name' foi preenchido no corpo da requisição                       
    if (body.name == undefined){                 //se for undefined (preenchido errado)                       
        return response.status(400).json({message: 'NAME REQUIRED'}); //retorna erro
    }
    if (body.name == ''){                       // se não foi preenchido
        return response.status(400).json({message: 'NAME REQUIRED'}); //retorna erro
    }
    next(); //tudo ok? next middleware
};                                                          

#   authMiddleware.js
    //código de autenticação de rota conforme solicitado

    const jwt = require('jsonwebtoken');  // Importa o módulo jsonwebtoken para manipular tokens JWT
       
const authenticateToken = (req, res, next) => {   // Função middleware p autenticar o token
   
    const authHeader = req.headers['authorization'];  // Pega o cabeçalho de autorização da requisição
    // Pega o token preenchido (o token fica do lado de Bearer)
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.sendStatus(401); // Se não tem token, retorna 401 (não autorizado)

    // Verifica a validade do token usando a chave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Se tiver erro na verificação, retorna 403 (proibido)
        
        req.user = user;            // Se o token for válido, adiciona o usuário ao objeto de requisição
       
        next(); //proxima funcao
    });
};


##  generateToken.js
    esse é o gerador de token, a função é pequena, entt segue o exemplo abaixo:

    const jwt = require('jsonwebtoken');  // Importa o módulo jsonwebtoken para manipular tokens JWT
require('dotenv').config();               // Carrega as variáveis de ambiente do arquivo .env


const token = jwt.sign({ username: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                         // Gera um token JWT com a chave secreta e expira em 1 hora
console.log(token);      // Exibe o token gerado no console

