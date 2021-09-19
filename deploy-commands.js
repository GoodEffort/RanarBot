const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.test.json');

const commands = [ 
	new SlashCommandBuilder().setName('poweronserver').setDescription('Turns on the server'),
	new SlashCommandBuilder().setName('checkstatus').setDescription('Checks if the server is accessible'),
	new SlashCommandBuilder().setName('startvalheim').setDescription('Starts the Valheim Dedicated Server program (use if the server crashed but the server is on)'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();