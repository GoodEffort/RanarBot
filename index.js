const { Client, Intents } = require('discord.js');
const { token, MAC, IP, username, serverPath } = require('./config.json');
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
            await interation.deferReply("Turning on server");
            out = await exec(`wakeonlan ${ MAC }`);
            await interation.editReply("Command sent...");
            out = await exec(`ping ${ IP } -c 1 | grep received | awk ' { print $4 } '`);

            let count = 0;
            while (+out.stdout === 0 && count < 20) {
                out = await exec(`ping ${ IP } -c 1 | grep received | awk ' { print $4 } '`);
                await interation.editReply(`Server starting up ${ count }`);
                count++;
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            await interation.editReply(+out.stdout > 0 ? 'Server started!' : 'Timeout error');
        break;
        case 'checkstatus':
            await interation.deferReply("Checking Server");
            out = await exec(`ping ${ IP } -c 1 | grep received | awk ' { print $4 } '`);
            await interation.editReply(+out.stdout > 0 ? 'Server On' : 'Server Off');
        break;
        case 'startvalheim':
            await interation.deferReply("Working");

            out = await exec(`ssh ${ username }@${ IP } "export DISPLAY=:0; nohup gnome-terminal -- ${ serverPath }"`);

            await interation.editReply("Server now Running!");
        break;
    }
})

client.login(token);