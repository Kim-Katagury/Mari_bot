const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    // Pega o body da API utilizando a npm @Superagent
    const superagent = require('superagent')
    const {body} = await superagent
    .get(`https://nekos.life/api/v2/img/kiss`)

    // User é o mencionado
    let user = message.mentions.users.first();
    if (!user) return message.reply(" | Mencione um usúario para beijar.")
    if (user.id == message.author.id) return message.reply("Você não pode se beijar.")

    // Embed padrão pegando o {body} lá de cima
    let beijar = new Discord.RichEmbed()
    .setColor("#00A2FF")
    .setTitle(`${message.author.username} chegou bem calmo e beijou ${user.username}.`)
    .setFooter(`Será que temos um novo casal?`, `${message.author.avatarURL}`)
    .setImage(body.url)
    message.channel.send(beijar)
    
}
module.exports.info = {
    name: "beijar",
    aliases: ["kiss", "beijo"]
}