const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const config = require('./config.json');
//const token = ''

const snipes = {};
const editSnipes = {};
const reactionSnipes = {};

client.once('ready', () => {
   console.log('Congratulations, your Discord bot has been successfully initialized!');

   // var generalChannel = client.channels.cache.get("237687478335700992")
   // generalChannel.send("Hola a todos!!")
});

client.on("messageDelete", message => {
	if (message.partial || (message.embeds.length && !message.content)) return; // content is null or deleted embed

	snipes[message.channel.id] = {
		author: message.author,
        avatar: message.author.displayAvatarURL({dynamic : true}),
		content: message.content,
		createdAt: message.createdTimestamp,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	};
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.partial || (oldMessage.embeds.length && !oldMessage.content)) return; // content is null or deleted embed
    if (newMessage.partial || (newMessage.embeds.length && !newMessage.content)) return;

	editSnipes[oldMessage.channel.id] = {
		author: oldMessage.author,
        avatar: oldMessage.author.displayAvatarURL({dynamic : true}),

		content: oldMessage.content,
        newcontent: newMessage.content,

		createdAt: oldMessage.createdTimestamp,
		image: oldMessage.attachments.first()
			? oldMessage.attachments.first().proxyURL
			: null,
	};
});

client.on('messageCreate', message => {

    if (message.content === 'hola') {
        message.channel.send('hola tio!')
    }

    if (message.content === 'adios') {
        message.channel.send('adios tio!')
    }

	if (message.content === 'maricon?') {
        message.channel.send('molat')
    }

    // EL SNIPE

    if (message.content === "i snipe" || message.content === "I snipe" ) {

		const snipe = snipes[message.channel.id];

		if (!snipe) return message.channel.send("¡No hay mensajes para snipear!");

		const embed = new MessageEmbed()
			.setAuthor(snipe.author.tag, snipe.avatar)
			.setFooter(`#${message.channel.name}`)
			.setTimestamp(snipe.createdAt);
		snipe.content ? embed.setDescription(snipe.content) : null;
		snipe.image ? embed.setImage(snipe.image) : null;

        message.channel.send({ embeds: [embed] })
	} 

    // EL EDITSNIPE

    if (message.content === 'i editsnipe' || message.content === "I editsnipe" ) {

		const editsnipe = editSnipes[message.channel.id];

		if (!editsnipe) return message.channel.send("¡No hay mensajes para snipear!");

		const embed2 = new MessageEmbed()
			.setAuthor(editsnipe.author.tag, editsnipe.avatar)
			.setFooter(`#${message.channel.name}`)
			.setTimestamp(editsnipe.createdAt);

        editsnipe.newcontent || editsnipe.content ? embed2.addFields(
            { name: 'Antiguo Mensaje', value: editsnipe.content },
            { name: 'Nuevo mensaje', value: editsnipe.newcontent , inline: true },
        ) : null

		editsnipe.image ? embed2.setImage(editsnipe.image) : null;

        message.channel.send({ embeds: [embed2] })
    }

    // EL REACTSNIPE

    if (message.content === 'i reactsnipe' || message.content === "I reactsnipe" ) {
        message.channel.send('Comando en proceso de desarrollo')
    }


})

client.login(config.token);