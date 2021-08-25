const roteador = require('express').Router();

roteador.use('/', (req, res) =>{
    res.send('rota de fornecedores')
})

module.exports = roteador;