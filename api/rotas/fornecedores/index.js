const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;
const TabelaProduto = require('./produtos/TabelaProduto')

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

roteador.get('/:idFornecedor', async (req, res, next)=>{
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        res.status(200);
        const serializadorFornecedor = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        );            
        res.send(serializadorFornecedor.serializar(fornecedor));
    } catch (error) {
        next(error);
    }
})

roteador.put('/:idFornecedor', async (req, res, next)=>{
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        const dados = Object.assign({}, dadosRecebidos, {id: id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar()
        res.status(204);
        res.end();
    } catch (error) {
       next(error);
    }
})

roteador.delete('/:idFornecedor', async (req, res, next) =>{
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        await fornecedor.remover();
        res.status(204);
        res.end();
    } catch (error) {
        next(error)
    }
})

const roteadorProdutos = require('./produtos');

const verificarFornecedor = async (req, res, next) =>{
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        req.fornecedor = fornecedor;
        next();
    } catch (error) {
        next(error)
    }
}

roteador.post('/:idFornecedor/calcular-reposicao-de-estoque', async (req, res, next) => {
    try {
        const fornecedor = new Fornecedor({id: req.params.idFornecedor})
        await fornecedor.carregar()
        const produtos = await TabelaProduto.listar(fornecedor.id, { estoque: 0 })
        res.send({
            mensagem: `${produtos.length} precisam de reposição de estoque`
        })
    } catch (error) {
        next(error)
    }
})

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos);



module.exports = roteador;