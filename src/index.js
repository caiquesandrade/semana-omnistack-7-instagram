const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app); //Suporte protocolo http
const io = require('socket.io')(server); //Permite fazer a comunicação em tempo real //Suporte protocolo web socket //Permite enviar e receber requisições para todos que estão conectados a nossa aplicação

mongoose.connect('mongodb+srv://admin:1234@cluster0-mwc1h.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;


    next(); //Vai garantir que esse bloco seja executado porém as outras rotas não vao ser interceptadas, vão ser executadas.
}) //Tudo que vier depois desse middleware, vão ter acesso as info do req.io


app.use(cors()); //Para permitir que as URLs de diferentes servidores possam acessar esse back end, sem isso o React não consegue acessar a aplicação

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))) //Rota para acessar os arquivos estáticos que fizemos o upoload 

app.use(require('./routes')); //Para declarar as rotas da aplicação

server.listen(3333);

