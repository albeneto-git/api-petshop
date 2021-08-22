const Sequelize = require('sequelize')
const conexao = Sequelize(
    'petshop',
    'root',
    'neto',
    {
        host: '127.0.0.1',
        dialect: 'mysql'  
    }

)
module.exports = conexao