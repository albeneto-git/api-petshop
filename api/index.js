const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')


const app = express()
app.use(bodyParser.json())
app.use('/api/fornecedores', roteador)
app.use((error, req, res, next) => {
    let status = 500;
    if(error instanceof NaoEncontrado) {
        status = 404;
    }

    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos){
        status = 400;
    }

    if(error instanceof ValorNaoSuportado) {
        status = 406;
    }
    
    res.status(status);
    res.send(JSON.stringify({
        mensagem: error.message,
        id: error.idErro
    }));
})
app.listen(config.get('api.port'), () => console.log('API esta rodando na porta 3000'))