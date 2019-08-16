const {
    Client,
    Collection
} = require("discord.js");
const {
    readdir,
    lstatSync
} = require("fs");
const {
    token,
    prefix
} = require("./config.json");
const client = new Client();

client.cmds = new Collection();
client.aliases = new Collection();

client.on("ready", () => {
   console.log(`Estou online em ${client.guilds.size} servidores.`)
})

const carregarComandos = module.exports.carregarComandos = (dir = "./comandos/") => {
    readdir(dir, (erro, arquivos) => {
        if (erro) return console.log(erro);
        arquivos.forEach((arquivo) => {
            try {
                if (lstatSync(`./${dir}/${arquivo}`).isDirectory()) {
                    carregarComandos(`./${dir}/${arquivo}`)
                } else if (arquivo.endsWith(".js")) {
                    const salvar = (nome, aliases = [], props) => {
                        client.cmds.set(nome, props)
                        if(aliases.length > 0) aliases.forEach((alias) => client.aliases.set(alias, props))
                        console.log(`O comando ${nome} foi carregado.`)
                    }
                    const props = require(`./${dir}/${arquivo}`)
                    if(!props.run)  {
                        console.log(`Não existe uma função que ative o comando no arquivo: ${arquivo.split(".")[0]}. Então ele foi ignorado`);
                        return;
                    }

                    if (props.info && props.info.name) {
                        const nome = props.info.name
                        const aliases = props.info.aliases || []
                        salvar(nome, aliases, props)
                    } else {
                        const propsKeys = Object.keys(props)
                        if (!propsKeys) {
                            console.log(`Não existem propiedades no arquivo: ${arquivo.split(".")[0]}. Então ele foi ignorado.`)
                            return;
                        }
                        const nomeKey = propsKeys.find((key) => props[key] && (props[key].name || props[key].nome))
                        if(!nomeKey) {
                            console.log(`Não existe a propiedade que remeta ao nome do comando no arquivo: ${arquivo.split(".")[0]}. Então ele foi ignorado.`)
                            return; 
                        }

                        const nome = props[nomeKey].name || props[nomeKey].nome
                        const aliases = props[nomeKey].aliases || []
                        salvar(nome, aliases, props)
                    }
                }
            } catch (ex) {
                console.log(`Erro no comando ${arquivo}`)
                console.log(ex)
            }
        })
    })
}
carregarComandos(); 

// Eventos que podem ser passados pra pasta futuramente
client.on("message", async message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.channel.type != 'text') return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const cmdParaExecutar = client.cmds.get(cmd) || client.aliases.get(cmd)
    if (cmdParaExecutar != null) cmdParaExecutar.run(client, message, args)
})

// Eventos que podem ser passados pra pasta futuramente
client.on('guildMemberAdd', member => {

    const entrar = new Discord.RichEmbed()
        .setColor("#00076A3")
        .setAuthor("Me conhece?, que tal conhecer?", `${member.avatarURL}`)
        .setTitle("De vez em quando eu posso ficar offline, pra ir comprar um dogão ou ir no McDonalds..")
        .setDescription("Se você tiver algum dinheiro sobrando, sabe? Aquele que fica na gaveta ou que você ia comprar cartinhas, me doe! Presciso pagar as contas :(")
        .setFooter("Desenvolvido por Kim (C)")
        member.send(entrar)
})

// Eventos que podem ser passados pra pasta futuramente
client.on('guildMemberAdd', member => {

   const anuncio = new Discord.RichEmbed()
   .setColor("#0076A3")
   .setAuthor(`Bem vindo ${member}`, `${member.avatarURL}`)
   .setTitle("Antes de tudo, deixa eu me apresentar :)")
   .setDescription(`Meu nome é Xyon e sou um super-bot pra Discord.`)
   .addField("Tenho comandos de moderação!", "E são muitos...", true)
   .setThumbnail(`${member.avatarURL}`)
   .addField("Eu sei cantar!", "Ou pelo menos tento?!", true)
   .addField("Posso divertir seu servidor", "Ao menos se forem nerds", true)
   .addField("Comece utlizando:", `x!help`, true)
   .setFooter("Fui desenvolvido por Kim, e sou open-source")
   member.send(anuncio)
})

client.login(token)