const qrcode = require('qrcode-terminal')
const {  MessageOptions } = require('whatsapp-web.js');
const { Client, LocalAuth, Buttons, MessageMedia } = require('whatsapp-web.js')
const wwebVersion = '2.2407.3';
const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },

    puppeteer: { 
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--disable-gpu', '--no-sandbox'],

    
    },  
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    //send QRCode on api endpoint
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});


let numbers = []
client.on('message', async (msg) => {
    // Pegar o número do remetente

    if(!numbers.includes(msg.from)){
        await msg.reply('Bot in development, ignore this for now 🐒')
        numbers.push(msg.from) // add on var numbers a msg.from
    }


});

client.initialize();
