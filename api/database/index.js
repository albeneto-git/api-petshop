const Sequelize = require('sequelize')

const conexao = new Sequelize(
    'petshop',
    'root',
    'neto',
    {
        host: '127.0.0.1',
        dialect: 'mysql'  
    }

)
module.exports = conexao