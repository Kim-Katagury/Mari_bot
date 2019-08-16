const Discord = require('discord.js');
const mysql = require('mysql');

module.exports.run = async (client, message, args) => {
    
let connection = mysql.createConnection({
    host: 'host',
    user: 'usúario',
    password: 'password',
    database: 'db'
})

// Query aqui é como em quiasquer bancos
connection.query('SELECT algo FROM tabela', function (error, results, rows, fields) {

  // Se o valor de row for 0 = Não retornará
  if (error) throw error;
		if (!rows) throw rows;
     message.channel.send(`${results[0].algo}`)  // Procura na tabela algo e retorna a mensagem com o resultado
     connection.end();
            
})
}
exports.config = { 
    name: 'teste',
    aliases: ['tabela']
}