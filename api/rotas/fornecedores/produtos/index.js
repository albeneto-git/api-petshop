const roteador = require('express').Router({mergeParams: true})
const Tabela = require('./TabelaProduto')
const { json } = require('body-parser')
const Produto = require('./Produto')

roteador.get('/', async (req, res)=>{
    const produtos = await Tabela.listar(req.fornecedor.id)
    res.send(
        JSON.stringify(produtos)
    );
})

roteador.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const corpo        =  req.body
        const dados        = Object.assign({}, corpo, { fornecedor : idFornecedor})    
        const produto      = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(produto)
    } catch (error) {
        next(error)
    }
})

roteador.delete('/:id', async (req, res) =>{
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.if
    }
    const produto = new Produto(dados);
    await produto.apagar();
    res.status(204)
    res.end()
})

roteador.get('/:id', async(req, res, next) =>{
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        const produto = new Produto(dados)
        await produto.carregar()
        res.send(
            JSON.stringify(produto)
        )    
    } catch (error) {
        next(error)
    }
    
})

module.exports = roteador;