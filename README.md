# RanarBot
A discord bot to turn on and check the status of a Valheim server

You need the IP of your machine set to a static IP for the "check status" and "start valheim" commands

This is designed to run on a Raspberry Pi with wakeonlan, nodejs, and ssh installed
and ssh configured so that it can send commands without a password to the target machine using ssh keys

Configure the bot by editing the config.example.json with your info for your bot, server, and machine and rename it to config.json

to add the commands to your server run "node deploy-commands.js" in the folder you cloned this into after filling out the config and setting up a bot
for instructions on how to get the info for the config look at the Discord.js guide
https://discordjs.guide/preparations/adding-your-bot-to-servers.html


then install Node.js v16.9.1
then run "node index.js" in the project folder