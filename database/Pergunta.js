const Sequelize = require('sequelize');

const connection = require('./database');

//CRIANDO TABELAS
const Pergunta = connection.define('perguntas',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//force = false, se a tabela ja existir ele não irá recriar a tabela
Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;