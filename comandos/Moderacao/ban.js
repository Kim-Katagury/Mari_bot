const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

	// Verifica se o autor tem permissão pra banir.
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Erro | ${message.author} você prescisa da permissão BANIR MEMBROS pra utilizar isso.`)

    // Se argumento for menor que 0 retorna
    if(args.length === 0) return message.reply(`Utilize ;ban @usuario @motivo`);

    // Define que membro é a menção ou o nickname.
    let banMember = message.mentions.users.first() || message.guild.users.get(args[0]);
    if(!banMember) return message.reply(" | Usúario não encontrado.");

    // Pega a razão do ban e se não tiver insere uma.
    let banReason = args.join(" ").slice(22) || args.slice(1).join(" ");
            if (banMember.id == message.author.id) return message.reply(" | Você não pode se banir.")
    if(!banReason){
        banReason = "Sem motivo definido."
    }

    try {

         // Função de banir do Discord
         message.guild.member(banMember).ban(banReason);

         // Embed do banimento.
        const marilinda = new Discord.RichEmbed()
        .setColor('#0d224f')
		.setThumbnail('https://vignette.wikia.nocookie.net/itadakimasu-discord/images/a/a1/Emoji_u1f44b.svg.png/revision/latest?cb=20170810073802')
		.setAuthor('Banido!', banMember.avatarURL, 'https://www.ojogo.ga')
		.setURL('http://www.ojogo.ga')
		.addField('Motivo', banReason, true)
		.setFooter("Foi um prazer enquanto durou.")
		.addField('Usúario', banMember, true)
		message.channel.send(marilinda)
        message.channel.send(`${banMember} foi banido, supera!`)

        // Catch pois usei o try lá em cima
        } catch (error) {
        message.reply(`${error}`);
    }
}
module.exports.info = {
    name: "banimento",
    aliases: ["superkick", "banir", "ban"]
}
