const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

	// Se o autor da mensagem tiver o ID
	if (message.author.id != 600109228430065664) return message.reply(" | Erro: apenas meu desenvolvedor pode utilizar isso.") 

	// Envia no canal desligando...
	message.channel.send("Desligando...").then(msg => {

	// Cria um timeout pra desligar dando process.exit
	setTimeout(function() {
	process.exit();
	},  10000)
  })

}
module.exports.info = {
    name: "desligar",
    aliases: ["desligo", "botoff", "stop"]
}

