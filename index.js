const { Client, Intents } = require('discord.js');
const { token, MAC, IP, username } = require('./config.test.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready');
});

client.on('interactionCreate', async interation => {
    if (!interation.isCommand()) return;

    const { commandName } = interation;
    let out;

    switch(commandName) {
        case 'poweronserver':
            out = await exec(`wakeonlan ${ MAC }`);
            await interation.reply(!out.stderr ? "Starting Server!" : "Error");
        break;
        case 'checkstatus':
            out = await exec(`ping ${ IP } -c 1 | grep received | awk ' { print $4 } '`);
            await interation.reply(+out.stdout > 0 ? 'Server On' : 'Server Off');
        break;
        case 'startvalheim':
            out = await exec(`ssh ${ username }@${ IP } "export DISPLAY=:0; nohup gnome-terminal -- /home/luke/startserver.sh &>/dev/null &"`);
            await interation.reply("Attemting to start the server script!");
        break;
    }
})

client.login(token);