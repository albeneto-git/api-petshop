const roteador = require('express').Router({mergeParams: true})
const Tabela = require('./TabelaProduto')
const { json } = require('body-parser')

roteador.get('/', async (req, res)=>{
    const produtos = await Tabela.listar(req.params.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    );
})

module.exports = roteador;