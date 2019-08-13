const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

	// Desenvolve as mensagens random para o kick
    let replies = ['Kickado com sucesso.', 
                   'Foi um prazer até agora',
                   'Martelo do kick bateu nele',
                   'Nojentinho(a)',
                   'Foi kick te conhecer']
	let resultado = Math.floor((Math.random() * replies.length))

	// Verifica se o usúario tem permissão para kickar membros.
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(" | Você prescisa da permissão ``KICKAR MEMBROS`` para utilizar este comando.");

    // Se usúario não for passado, retorna
    let usuario = message.mentions.users.first();
    if(!usuario) return message.channel.send(`${message.author} | Mencione o usúario que quer kickar.`) 

    // Se razão não for passada, insere não definida.
    	let razao = args.slice(1).join(" ")
    if(!razao){
    	razao = "Sem razão definida."
    }
    if(usuario.id == message.author.id) return message.channel.send(`${message.author} | Você não pode se kickar.`)
    	message.guild.member(usuario).kick(razao)
    	usuario.send(`${usuario} | Você foi kickado por ${message.author.username} pelo motivo: ${razao}`)

    // Envia no canal um embed
    const avisacanal = new Discord.RichEmbed()
    .setColor("#0d224f")
    .setThumbnail('https://vignette.wikia.nocookie.net/itadakimasu-discord/images/a/a1/Emoji_u1f44b.svg.png/revision/latest?cb=20170810073802')
    .setAuthor(replies[resultado], `${usuario.avatarURL}`)
    .setURL('www.kickado.com')
    .addField('Motivo do kick', razao, true)
    .addField('Usúario', `${usuario.tag}`, true)
    message.channel.send(avisacanal)
}
module.exports.info = {
    name: "kick",
    aliases: ["kickado", "kickar", "kickk"]
}