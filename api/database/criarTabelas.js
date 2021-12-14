const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas () {
    for (let index = 0; index < modelos.length; index++) {
        const modelo = modelos[index];
        await modelo.sync()
    }
}

criarTabelas()