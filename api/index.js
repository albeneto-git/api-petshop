const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')

const app = express()
app.use(bodyParser.json())
app.use('/api/fornecedores', roteador)
app.use((error, req, res, next) => {
    if(error instanceof NaoEncontrado) {
        res.status(404);
    }else{
        res.status(400);
    }
    res.send(JSON.stringify({
        mensagem: error.message,
        id: error.idErro
    }));
})
app.listen(config.get('api.port'), () => console.log('API esta rodando na porta 3000'))