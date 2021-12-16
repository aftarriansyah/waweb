const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}else{
   console.log('session file notfound');
}


// Use the saved values
const client = new Client({
    session: sessionData
});

client.on('qr', qr => {
   qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
   console.log('Client is ready!');
});


client.on('message', message => {
   console.log(JSON.stringify(message));
	if(message.body === '!ping') {
		message.reply('pong');
	}
});


client.initialize();

