// CONSTS NESCESSÁRIAS \\
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone');
const axios = require('axios');
const fetch = require('node-fetch');
const { prefixo, botName, donoName, fotomenu } = require('./settings.json')

// MENSAGENS RAPIDAS \\
const msg = {
espere: "**𝙰𝚐𝚞𝚊𝚛𝚍𝚎, 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚊𝚗𝚍𝚘 𝚜𝚞𝚊 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚊𝚌𝚊𝚘.**",
dono: "**𝙼𝚎𝚗𝚜𝚊𝚐𝚎𝚖 𝚛𝚎𝚜𝚝𝚛𝚒𝚝𝚊 𝚊𝚘 𝚙𝚛𝚘𝚙𝚛𝚒𝚎𝚝𝚊𝚛𝚒𝚘 𝚍𝚘 𝚋𝚘𝚝.**",
grupo: "**𝙴𝚜𝚜𝚊 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚕𝚒𝚍𝚊𝚍𝚎 𝚎𝚜𝚝𝚊 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚟𝚎𝚕 𝚊𝚙𝚎𝚗𝚊𝚜 𝚎𝚖 𝚐𝚛𝚞𝚙𝚘𝚜.**",
premium: "𝙴𝚜𝚜𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚎 𝚎𝚡𝚌𝚕𝚞𝚜𝚒𝚟𝚘 𝚙𝚊𝚛𝚊 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚅𝙸𝙿/𝙿𝚛𝚎𝚖𝚒𝚞𝚖. 𝚀𝚞𝚎 𝚝𝚊𝚕 𝚜𝚎 𝚝𝚘𝚛𝚗𝚊𝚛 𝚞𝚖 𝚅𝙸𝙿 𝚎 𝚊𝚙𝚛𝚘𝚟𝚎𝚒𝚝𝚊𝚛 𝚝𝚘𝚍𝚊𝚜 𝚊𝚜 𝚟𝚊𝚗𝚝𝚊𝚐𝚎𝚗𝚜?",
query: "𝙿𝚊𝚛𝚎𝚌𝚎 𝚚𝚞𝚎 𝚟𝚘𝚌𝚎 𝚎𝚜𝚚𝚞𝚎𝚌𝚎𝚞 𝚍𝚎 𝚊𝚍𝚒𝚌𝚒𝚘𝚗𝚊𝚛 𝚞𝚖 𝚟𝚊𝚕𝚘𝚛 𝚘𝚞 𝚗𝚘𝚖𝚎 𝚍𝚎𝚙𝚘𝚒𝚜 𝚍𝚘 𝚌𝚘𝚖𝚊𝚗𝚍𝚘. 𝚂𝚎𝚖 𝚙𝚛𝚘𝚋𝚕𝚎𝚖𝚊𝚜, 𝚝𝚎𝚗𝚝𝚎 𝚗𝚘𝚟𝚊𝚖𝚎𝚗𝚝𝚎 𝚎 𝚟𝚊𝚖𝚘𝚜 𝚎𝚖 𝚏𝚛𝚎𝚗𝚝𝚎! 👍",
privado: "**𝙴𝚜𝚜𝚊 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚕𝚒𝚍𝚊𝚍𝚎 𝚎𝚜𝚝𝚊 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚟𝚎𝚕 𝚊𝚙𝚎𝚗𝚊𝚜 𝚎𝚖 𝚖𝚎𝚗𝚜𝚊𝚐𝚎𝚗𝚜 𝚙𝚛𝚒𝚟𝚊𝚍𝚊𝚜.**",
adm: "**𝙰𝚌𝚎𝚜𝚜𝚘 𝚛𝚎𝚜𝚝𝚛𝚒𝚝𝚘 𝚊𝚘𝚜 𝚊𝚍𝚖𝚒𝚗𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚛𝚎𝚜 𝚍𝚘 𝚐𝚛𝚞𝚙𝚘.**",
error: "**𝙾𝚌𝚘𝚛𝚛𝚎𝚞 𝚞𝚖 𝚎𝚛𝚛𝚘. 𝚃𝚎𝚗𝚝𝚎 𝚗𝚘𝚟𝚊𝚖𝚎𝚗𝚝𝚎 𝚖𝚊𝚒𝚜 𝚝𝚊𝚛𝚍𝚎.**",
botadm: "**𝙾 𝚋𝚘𝚝 𝚙𝚛𝚎𝚌𝚒𝚜𝚊 𝚍𝚎 𝚙𝚎𝚛𝚖𝚒𝚜𝚜𝚘𝚎𝚜 𝚍𝚎 𝚊𝚍𝚖𝚒𝚗𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚛 𝚙𝚊𝚛𝚊 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚛 𝚌𝚘𝚛𝚛𝚎𝚝𝚊𝚖𝚎𝚗𝚝𝚎.**",
}

//============( MENSAGENS DA API )===========\\
const msgApi = {
erro: "Desculpe, ocorreu um erro ao processar sua solicitação.",
paraQ: "Parece que falta um parâmetro obrigatório na sua solicitação.",
esperar: "Aguarde um momento enquanto processamos sua solicitação..."
}

// DATA E HORA \\

const data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

// MENSAGEM DE HORA \\
if(hora > "00:00:00"){
var timed = 'Boa Madrugada 🌆' 
} 
if(hora > "05:30:00"){
var timed = 'Bom Dia 🏙️' 
}
if(hora > "12:00:00"){
var timed = 'Boa Tarde 🌇' 
}
if(hora > "19:00:00"){
var timed = 'Boa Noite 🌃' 
}           

// CONSOLES \\
//VERDE
const consoleVerde = (texto) => {console.log(chalk.green(texto))}
const consoleVerde2 = (texto, texto2) => {console.log(chalk.black(chalk.bgGreen(texto)), chalk.black(chalk.white(texto2)))}
//VERMELHO
const consoleVermelho = (texto) => {console.log(chalk.red(texto))}
const consoleVermelho2 = (texto, texto2) => {console.log(chalk.black(chalk.bgRed(texto)), chalk.black(chalk.white(texto2)))}
//AMARELO
const consoleAmarelo = (texto) => {console.log(chalk.yellow(texto))}
const consoleAmarelo2 = (texto, texto2) => {console.log(chalk.black(chalk.bgYellow(texto)), chalk.black(chalk.white(texto2)))}
//AZUL
const consoleAzul = (texto) => {console.log(chalk.blue(texto))}
const consoleAzul2 = (texto, texto2) => {console.log(chalk.black(chalk.bgBlue(texto)), chalk.black(chalk.white(texto2)))}
//CONSOLE DE ERRO
const consoleErro = (texto) => {console.log(chalk.black(chalk.bgRed(`[ ERRO ]`)), chalk.black(chalk.white(`Erro: ${texto}`)))}
//CONSOLE DE AVISO
const consoleAviso = (texto) => {console.log(chalk.black(chalk.bgYellow(`[ AVISO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE SUCESSO
const consoleSucesso = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ SUCESSO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE ONLINE 
const consoleOnline = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ ONLINE ]`)), chalk.black(chalk.white(texto)))}

//============( GETBUFFER )===========\\
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

//============( FETCHJSON )===========\\
async function fetchJson (url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

//============( SELOS )===========\\

const selo = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: { "extendedTextMessage": {"text": botName,"title": null,'thumbnailUrl': null}}}

const seloGpt = {"key": {"participant": "18002428478@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Chat GPT", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Chat GPT\nitem1.TEL;waid=18002428478:18002428478\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

const seloMeta = {"key": {"participant": "13135550002@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Meta IA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:Meta IA\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

const seloLuzia = {"key": {"participant": "5511972553036@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "LuzIA", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Chat GPT;;;\nFN:LuzIA\nitem1.TEL;waid=5511972553036:5511972553036\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

const seloLaura = {"key": {"participant": "556191969269@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Laura AI", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Laura AI;;;\nFN:Laura AI\nitem1.TEL;waid=556191969269:556191969269\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};

const seloCopilot = {"key": {"participant": "18772241042@s.whatsapp.net","remoteJid": "status@broadcast", "fromMe": false,},"message": {
"contactMessage": {
"displayName": "Microsoft Copilot", "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;Microsoft Copilot;;;\nFN:Microsoft Copilot\nitem1.TEL;waid=18772241042:18772241042\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": {"forwardingScore": 1,"isForwarded": true}}}};


module.exports = { msg, msgApi, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleAviso, consoleOnline, consoleSucesso, fetchJson, getBuffer, timed, data, hora, selo, seloMeta, seloGpt, seloLuzia, seloLaura, seloCopilot }