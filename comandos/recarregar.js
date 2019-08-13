const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    
if (message.author.id !== "549433584738369537") return message.reply(" :warning: | Apenas meu desenvolvedor pode utilizar isso.");

try {
} catch (erro) {
  message.channel.send("Deu erro.")
}
    
    if (!args || args.length < 2)
      return message.reply(":warning: | Infelizmente presciso saber o comando que quer reiniciar.");

      const commandName = args[1];
      const pasta = args[2];
      
      delete require.cache[require.resolve(`${pasta}/${commandName}.js`)];
      
      message.react('🎈')
 const embed = new Discord.RichEmbed() 
     .setTitle(`O comando ${commandName} foi recarregado e já pode ser usado.`)
     .setColor("#0d224f")
     .setAuthor("Sucesso no reload.", "https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif","https://yagami.xyz")
     message.channel.send(embed)
    
 
}
exports.config = { // module.exports.config
    name: 'r',
    aliases: ['reload']
}