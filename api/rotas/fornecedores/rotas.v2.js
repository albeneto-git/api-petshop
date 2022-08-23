const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;
const Fornecedor = require('./Fornecedor')

roteador.options('/', (req, res) =>{
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200);
    const serializadorFornecedor = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    );
    res.send(serializadorFornecedor.serializar(resultados));
})

roteador.post('/', async (req, res, next) =>{
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        res.status(201);
        const serializadorFornecedor = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        );
        res.send(serializadorFornecedor.serializar(fornecedor));
    } catch (error) {
        next(error);
    }
})


module.exports = roteador