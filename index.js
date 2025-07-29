/*Creditós a yatomodas, contato: 558892153207*/

const { 
  default: makeWASocket, 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion, 
  makeInMemoryStore, 
  DisconnectReason,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  delay,
  downloadContentFromMessage
} = require('@whiskeysockets/baileys');

const colors = require('colors');
const cfonts = require('cfonts');
const fs = require('fs-extra');
const pino = require('pino');
const PhoneNumber = require('awesome-phonenumber')
const chalk = require('chalk')
let phoneNumber = "558892153207"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const NodeCache = require("node-cache")

const { menu } = require('./dono/menus.js')
const { msg18, msg, msgApi, consoleVerde, consoleVerde2, consoleVermelho, consoleVermelho2, consoleAmarelo, consoleAmarelo2, consoleAzul, consoleAzul2, consoleErro, consoleAviso, consoleOnline, consoleSucesso, fetchJson, getBuffer, timed, data, hora, selo, seloMeta, getFileBuffer, seloGpt, seloLuzia, seloLaura, seloCopilot } = require('./dono/functions.js')

const { prefixo, botName, API_NODZ, donoName, NumeroDono, fotomenu } = require('./dono/settings.json')

const setting = JSON.parse(fs.readFileSync('./dono/settings.json'));

// INÍCIO DA CONEXAO //
async function iniciarbot() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'debug', stream: 'store' }) });
const { state, saveCreds } = await useMultiFileAuthState('./arquivos/raya-code');
const { version } = await fetchLatestBaileysVersion();
const msgRetryCounterCache = new NodeCache()

const sock = makeWASocket({
version: [2, 3000, 1023223821],
logger: pino({ level: 'silent' }),
printQRInTerminal: !pairingCode,
mobile: useMobile,
browser: ['Chrome (Linux)', '', ''],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
},
browser: ['Chrome (Linux)', '', ''],
markOnlineOnConnect: true,
generateHighQualityLinkPreview: true,
getMessage: async (key) => {
let jid = jidNormalizedUser(key.remoteJid)
let msg = await store.loadMessage(jid, key.id)

return msg?.message || ""
},
msgRetryCounterCache,
defaultQueryTimeoutMs: undefined,
});

if (!sock.authState.creds.registered) {
try {
let number = await question(`${colors.cyan("Exemplo de como inserir o número: +55 88 9999-9999")}${colors.cyan("\nInsira o número de telefone nesse campo:")}`);
number = number.replace(/[^0-9]/g, "");
let code = await sock.requestPairingCode(number);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`${colors.yellow("Código para conectar a base: ")}` + colors.white(code));
rl.close();
} catch(error) {
console.error('Falha ao solicitar o código de registro. Por favor, tente novamente.\n', error)
}
};

store.bind(sock.ev);
sock.ev.on('creds.update', saveCreds);
sock.ev.on('chats.set', () => consoleSucesso('✔️ Conversas carregadas.'));
sock.ev.on('contacts.set', () => consoleSucesso('Conexão estabelecida.'));

const banner = cfonts.render('Raya Base', {
  font: 'tiny',
  align: 'center',
  colors: ['whiteBright', 'redBright']
});

const banner2 = cfonts.render('Criador: Yatomods', {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
});

console.log(banner.string);
console.log(banner2.string);

sock.ev.on('messages.upsert', async (upsert) => {
try {

// CONST PRINCIPAIS //
const msg = upsert.messages[0];
const info = msg;
if (!msg.message) return;
const from = msg.key.remoteJid;
const isGroup = from.endsWith('@g.us');
try {var groupMetadata = isGroup ?  await sock.groupMetadata(from): ""} catch {return}
const groupName = isGroup ? groupMetadata.subject : '';
const altpdf = Object.keys(info.message)
const type = altpdf[0] == 'senderKeyDistributionMessage' ? altpdf[1] == 'messageContextInfo' ? altpdf[2] : altpdf[1] : altpdf[0]
const sender = msg.key.participant || from;
const content = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
const pushname = info.pushName ? info.pushName : '';
const removerMaiusculas = (texto) => texto.toLowerCase();
const isCmd = content.startsWith(prefixo)
const cmd = isCmd ? content.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || ""

var Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || ""

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}
const botNumber = await sock.user.id.split(':')[0]+'@s.whatsapp.net';
const args = body.trim().split(/ +/).slice(1);
const q = args.join(' ');
const botz = msg.key.fromMe;
const types = Object.keys(msg.message)[0];
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const donofc = NumeroDono+"@s.whatsapp.net"
const IsDono = donofc.includes(sender) 
const SoDono = IsDono
const isGroupAdmins = groupAdmins.includes(sender) || false || IsDono
// CONSOLE COMANDOS //

if(isCmd && isGroup) {
console.log(colors.brightGreen(`

〔 ${colors.brightYellow("USUÁRIO")} 〕: ${pushname}

〔 NÚMERO 〕:〔 ${colors.brightMagenta(sender.split("@")[0])} 〕

〔 ${colors.brightMagenta("GRUPO")} 〕:〔 ${colors.cyan(groupName)} 〕

〔 COMANDO 〕:「 ${cmd} 」`))
} else if(isCmd && !isGroup) {
console.log(colors.brightGreen(`

〔 ${colors.brightYellow("USUÁRIO")} 〕: ${pushname}

〔 NÚMERO 〕:〔 ${colors.brightMagenta(sender.split("@")[0])} 〕

〔 ${colors.red("PRIVADO")} 〕 

〔 COMANDO 〕 :「 ${cmd} 」`)) 
}

// CONST E FUNÇÕES //

const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant

const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net"

const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid

const menc_os2 = q.includes("@") ? menc_jid : menc_prt

var texto_exato = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

const texto = texto_exato.slice(0).trim().split(/ +/).shift().toLowerCase()

//=========(isQuoted/consts)=============\\
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')

const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')

const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')

const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

//========( GETFILEBUFFER )=========\\

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType);
let buffer = Buffer.from([]);
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer;
};

const { sendVideoAsSticker2, sendImageAsSticker2 } = require('./arquivos/sticker/rename2.js');

//====================≠≠===============\\

// FUNÇÃO DO RENAME STICKER //

const { Sticker } = require("./arquivos/sticker/rename/sticker.js");

async function renameContextSticker(pack, autor, txt = ``, info) {
  try {
    getfile = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
    var _sticker = new Sticker()
    _sticker.addFile(getfile); 
    _sticker.options.metadata = {pack: pack, author: autor, emojis: ['🤠', '🥶', '😻']};
    resultadoSt = await _sticker.start();
    await sock.sendMessage(from, {sticker: fs.readFileSync(resultadoSt[0].value), contextInfo: {externalAdReply: {title: txt, body:"", previewType:"PHOTO", thumbnail: fs.readFileSync(resultadoSt[0].value)}}}, {quoted: info})
    await fs.unlinkSync(resultadoSt[0].value)
  } catch(e) {console.log(e)}
}
// FUNÇÃO TOTAL COMANDOS\\
const infocases = async () => {
  try {
    const data = await fs.readFile('./index.js', 'utf8');
    let regex = /case\s'(\w+)'/g;
    let match;
    let caseNames = [];

    while ((match = regex.exec(data)) !== null) {
      caseNames.push(match[1]);
    }

    let totalCount = caseNames.length;
    return totalCount;
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
    return 0;
  }
};

const totalcmds = await infocases();

// FUNÇÃO DE TEMPO //

if(hora > "00:00:00" && hora < "05:00:00"){
var tempo = 'Boa noite'
} if(hora > "05:00:00" && hora < "12:00:00"){
var tempo = 'Bom dia'
} if(hora > "12:00:00" && hora < "18:00:00"){
var tempo = 'Boa tarde'
} if(hora > "18:00:00"){
var tempo = 'Boa noite'
}

const os = require('os');
const infoSystem = require('os')

/* Essa função serve para transformar segundos em hora, minutos.. */
function kyun(seconds){
function pad(s){return (s < 10 ? "0" : "") + s};
var horas = Math.floor(seconds / (60*60) % (24));
var minutos = Math.floor(seconds % (60*60) / 60);
var segundos = Math.floor(seconds % 60);
return `${pad(horas)}h, ${pad(minutos)}m e ${pad(segundos)}s.`;
}

// DELETAR ARQUIVOS:
function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}

//SIMULA ESCRITA //
async function escrever (texto) {
await sock.sendPresenceUpdate('composing', from) 
await esperar(1000)   
sock.sendMessage(from, { text: texto }, {quoted: info})
}

//ENVIA UMA MENSAGEM //
const enviar = (texto) => {
sock.sendMessage(from, { text: texto }, {quoted: info})
}

//ENVIA UMA IMAGEM SIMPLES //
const enviarImg = async (link) => {
await sock.sendMessage(from, {image: {url: link}}, {quoted: info})
}

//ENVIA UMA IMAGEM COM TEXTO //
const enviarImg2 = async (link, texto) => {
await sock.sendMessage(from, {image: {url: link}, caption: texto}, {quoted: info})
}

//ENVIA UM VÍDEO SIMPLES //
const enviarVd = async (link) => {
await sock.sendMessage(from, {video: {url: link }, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}

//ENVIA UM VIDEO COM TEXTO //
const enviarVd2 = async (link, texto) => {
await sock.sendMessage(from, {video: {url: link }, caption: texto, mimetype: "video/mp4", fileName: "video.mp4"}, {quoted: info})
}

//ENVIAR UM ÁUDIO //
const enviarAd = async (link) => {
await sock.sendMessage(from, {audio: {url: link }, mimetype: "audio/mpeg"}, {quoted: info})
}

// FUNÇÃO DE ESPERA //
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}

//FUNCAO DE REAGIR A MENSAGEM //
const reagir = async (idgp, emj) => {
var reactionMessage = {
react: {
text: emj, 
key: info.key
}
} 
sock.sendMessage(idgp, reactionMessage)
}

// COMANDOS COM PREFIXO //

switch (cmd) {

case 'menu':
reagir(from, "✅️")
await sock.sendMessage(from, {image: {url: fotomenu}, caption: menu(donoName, botName, prefixo, sender)}, {quoted: seloMeta});
break;

case 'prefixo-bot': case 'setprefix':
if(!IsDono) return enviar('exclusivo apenas para meu dono.')
if(!q) return enviar('cade o simbolo?')
setting.prefixo = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(setting, null, 2))
enviar(`O prefixo foi alterado com sucesso para: ${setting.prefixo}`)
setTimeout(async () => {
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
break

case 'nome-bot':
if(!IsDono) return enviar('exclusivo apenas para meu dono.')
if(!q) return enviar('cade o nome?')
setting.botName = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(setting, null, 2))
enviar(`Meu nome foi alterado com sucesso para: ${q}`)
setTimeout(async () => {
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
break

case 'nick-dono':
if(!IsDono) return enviar('exclusivo apenas para meu dono.')
if(!q) return enviar('cade o nome?')
setting.donoName = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(setting, null, 2))
enviar(`O nick do dono foi configurado para: ${q}`)
setTimeout(async () => {
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
break

case 'numero-dono':
if(!IsDono) return enviar('exclusivo apenas para meu dono.')
if(!q) return enviar('cade o numero?')
if(q.match(/[a-z]/i)) return enviar("É apenas números.")
enviar(`O número dono foi configurado com sucesso para: ${q}`)
setting.NumeroDono = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(setting, null, 2))
setTimeout(async () => {
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
break

case 'ping': {
reagir(from, '⚡️')
r = (Date.now() / 1000) - info.messageTimestamp
uptime = process.uptime()
var ping = `${tempo}, Usuário: ${sender.split("@")[0]}\n\n🖥 *Sistema operacional:* ${infoSystem.type()}\n⚙️ *Versão:* ${infoSystem.release()}\n⏰️ *Horario atual:* ${hora}\n📆 *Data atual:* ${data}\n🤖 *Tempo online:* ${kyun(uptime)}\n📊 *Comandos totais:* ${totalcmds}\n🗂 *Memoria ram total:* ${(infoSystem.totalmem()/Math.pow(1024, 3)).toFixed(2)} GB\n🗂 *Memoria ram livre:* ${(infoSystem.freemem()/Math.pow(1024, 3)).toFixed(2)} GB`
await sock.sendMessage(from, { image: { url: `https://api.popcat.xyz/welcomecard?background=https://files.catbox.moe/wi9c2t.jpeg&text1=RAYA%20BOT&text2=${String(r.toFixed(3))}&text3=%3E%3E%20SPEED%20BOT%20%3C%3C&avatar=https://files.catbox.moe/dxmnzl.jpeg` }, caption: ping}, {quoted: info})
}
break

case 'add': case 'unkick':
if(!isGroupAdmins) return enviar('você não é um administrador.')
if(!isBotGroupAdmins) return enviar('Para adicionar alguém eu preciso ser adm.')
if(!q && info.message.extendedTextMessage === null) return enviar('Marque a mensagem ou coloque o número de quem você quer adicionar no grupo.')
try {
useradd = `${args.join(" ").replace(/\D/g,'')}` ? `${args.join(" ").replace(/\D/g,'')}` : info.message.extendedTextMessage.contextInfo.participant
let id = `${useradd.replace(/\D/g,'')}`
if(!id) return enviar(`Número inválido.`)
let [result] = await sock.onWhatsApp(id)
if(!result) return enviar(`Esse número não está registrado no WhatsApp.`)
let response = await sock.groupParticipantsUpdate(from, [result.jid], "add")
if(response[0].status == "409") {
sock.sendMessage(from, {text: `contato já está no grupo, patrão!`, mentions: [result.jid, sender]})
} else if(response[0].status == "403") {
sock.sendMessage(from, {text: `Não consegui adicionar ${result.jid.split("@")[0]} porque privou a conta.`, mentions: [result.jid, sender]})
} else if(response[0].status == "408") {
sock.sendMessage(from, {text: `Não consegui adicionar ${result.jid.split("@")[0]} porque saiu do grupo.`, mentions: [result.jid, sender]})
} else if(response[0].status == "401") {
sock.sendMessage(from, {text: `Não consegui adicionar ${result.jid.split("@")[0]} porque me bloqueou.`, mentions: [result.jid, sender]})
} else if(response[0].status == "200") return enviar('Prontinho, adicionado com sucesso.')
} catch(e) {
console.log("[ERROR]:"+ e)
}
break

case 'ban': case 'banir': case 'kick':
if(!isGroupAdmins) return enviar('você não é um administrador.')
if(!isBotGroupAdmins) return enviar('Para remover alguém eu preciso ser adm.')
try {
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("Este usuário já foi removido do grupo ou saiu.")
if(botNumber.includes(menc_os2)) return enviar('Não sou besta de remover eu mesmo né 🙁, mas estou decepcionado com você.')
if(JSON.stringify(NumeroDono).indexOf(menc_os2) >= 0) return enviar('Não posso remover meu dono 🤧')
enviar(`@${menc_os2.split("@")[0]} removido com sucesso.`)
sock.groupParticipantsUpdate(from, [menc_os2], "remove")
} catch (e) {
console.log(e)
}
break

case 'promover': 
if(!isGroupAdmins) return enviar('você não é um administrador.')
if(!isBotGroupAdmins) return enviar('Para promover alguém eu preciso ser adm.')
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("Este usuário foi removido do grupo ou saiu, não será possível promover..")
sock.sendMessage(from, {text: `@${menc_os2.split("@")[0]} promovido com sucesso.`, mentions: [menc_os2]})
sock.groupParticipantsUpdate(from, [menc_os2], "promote")  
break

case 'rebaixar': 
if(!isGroupAdmins) return enviar('você não é um administrador.')
if(!isBotGroupAdmins) return enviar('Para rebaixar alguém eu preciso ser adm.')
if(!menc_os2 || menc_jid2[1]) return enviar("Marque a mensagem do usuário ou marque o @ dele.., lembre de só marcar um usuário...")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return enviar("Este usuário foi removido do grupo ou saiu, não será possível rebaixar..")
sock.sendMessage(from, {text: `@${menc_os2.split("@")[0]} rebaixado com sucesso.`, mentions: [menc_os2]})
sock.groupParticipantsUpdate(from, [menc_os2], "demote")  
break

case 'avalie':
const avalie = body.slice(8)
if(!q) return enviar(`Exemplo: avalie "muito bom, parabéns. "`)
if(args.length >= 400) return sock.sendMessage(from, {text: 'Máximo 400 caracteres'}, {quoted: info})
var nomor = info.participant
tdptls = `[ Avaliação ]\nwa.me/${sender.split("@s.whatsapp.net")[0]}\nMensagem: ${avalie}`
sock.sendMessage(donofc, {text: tdptls}, {quoted: info})
enviar("Mensagem enviada ao meu dono, obrigado pela avaliação, iremos melhorar a cada dia.")
break

case 'sugestão':
case 'sugestao':
const sugestao = body.slice(10)
if(!q) return enviar(`Exemplo: sugestao "Opa, crie um comando tal.."`)
if(args.length >= 800) return sock.sendMessage(from, {text: 'Máximo 800 caracteres'}, {quoted: info})
sug = `[ Sugestões de Novos Comandos ]\n@${sender.split("@s.whatsapp.net")[0]}\nMensagem ${sugestao}`
sock.sendMessage(donofc, {text: sug, mentions: sender}, {quoted: info})
enviar("Mensagem enviada ao meu dono, obrigado pela sugestão..")
break

case 'criador':
case 'dono':
reagir(from, "🧙‍♂️")
enviar(`Olá, meu criador se chama Yatomodas\ncontato dele para dúvidas: ${NumeroDono}`)
break

case 'infodono':
const criador = `
『 *INFO DO MEU DONO* 』
╭─▹
┊ ➩ 👨🏻‍💻 NOME: Yatomods
┊ ➩ 🆔️ IDADE: 19
┊ ➩ 🇧🇷 ORIGEM: BRASILEIRO
┊ ➩ 💬 RECADO: GOOD BOY 
┊ ➩ 📆 DATA: ${data}
┊ ➩ 📊 TOTAL CMDS: ${totalcmds}
╰──▹`
reagir(from, "ℹ️")
sock.sendMessage(from,
{image: {url: 'https://files.catbox.moe/5190o7.jpg'},
caption: criador},
{quoted: info})
break

case 'sticker':
reagir(from, "✅️")
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if(boij2){
var pack = `↧ [👑] » Criador (a) da Figurinha:\n• ↳ ${pushname} owner\n—\n↧ [🩵] » Visite nosso Instagram:\n• ↳ instagram.com/euyato`
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(sock, from, owgi, info, { packname:pack})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
var pack = `↧ [👑] » Criador (a) da Figurinha:\n• ↳ ${pushname} owner\n—\n↧ [🩵] » Visite nosso Instagram:\n• ↳ instagram.com/euyato`
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(sock, from, owgi, info, { packname:pack})
await DLT_FL(encmedia)
} else {
reagir(from, "❌️")
return enviar(`Marque uma imagem, ou um vídeo de ate 9.9 segundos.`)
}
break

case 'toimg':
reagir(from, "✅️")
try {
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
sock.sendMessage(from, {image: buff}, {quoted: info}).catch(e => {
console.log(e);
enviar('*erro ao converter para imagem.*')
});
} catch (e) {
console.log(e)
reagir(from, "❌️")
}
break

case 'rename':
case 'roubar':
reagir(from, "✅️")
var kls = q
var pack = kls.split("|")[0];
var author2 = kls.split("|")[1];
if(!q) return enviar('*Falta um nome para renomear a figurinha.*')
if(!pack) return enviar(`*Necessita de um nome antes da barra ( | )*`)
renameContextSticker(pack, author2, `RENOMEADA COM SUCESSO`, info)
.catch((err) => {
reagir(from, "❌️")
enviar(`❌ Erro, tente mais tarde`); 
})
break

case 'play_audio':
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} nome`)
reagir(from, "🕜")
neon = await fetchJson(`https://nodz-apis.com.br/api/pesquisas/youtube?query=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {image: {url: `${neon.resultado.imagem}`}, caption: `▶️ *YOUTUBE - MUSICA*

🎵 *Título:* ${neon.resultado.titulo}
⏳ *Duração:* ${neon.resultado.duracao}
📺 *Canal:* ${neon.resultado.canal}
👁️ *Visualizações:* ${neon.resultado.views}

> ⏬ Enviando audio, aguarde..`}, {quoted: seloMeta});
sock.sendMessage(from, {audio: {url: `https://nodz-apis.com.br/api/downloads/youtube/audio?url=${neon.resultado.url}&apiKey=${API_NODZ}`}, mimetype: "audio/mpeg"}, {quoted: info})
break

case 'play_video':
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} nome`)
reagir(from, "🕜")
neon = await fetchJson(`https://nodz-apis.com.br/api/pesquisas/youtube?query=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {image: {url: `${neon.resultado.imagem}`}, caption: `▶️ *YOUTUBE - VIDEO*

📽 *Título:* ${neon.resultado.titulo}
⏳ *Duração:* ${neon.resultado.duracao}
📺 *Canal:* ${neon.resultado.canal}
👁️ *Visualizações:* ${neon.resultado.views}

> ⏬ Enviando video, aguarde..`}, {quoted: seloMeta});
sock.sendMessage(from, {video: {url: `https://nodz-apis.com.br/api/downloads/youtube/video?url=${neon.resultado.url}&apiKey=${API_NODZ}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'play_doc':
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} nome`)
reagir(from, "🕜")
neon = await fetchJson(`https://nodz-apis.com.br/api/pesquisas/youtube?query=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {image: {url: `${neon.resultado.imagem}`}, caption: `▶️ *YOUTUBE - DOCUMENTO*

🗂️ *Título:* ${neon.resultado.titulo}
⏳ *Duração:* ${neon.resultado.duracao}
📺 *Canal:* ${neon.resultado.canal}
👁️ *Visualizações:* ${neon.resultado.views}

> ⏬ Enviando documento, aguarde..`}, {quoted: seloMeta});
sock.sendMessage(from, {document: {url: `https://nodz-apis.com.br/api/downloads/youtube/video?url=${neon.resultado.url}&apiKey=${API_NODZ}`}, mimetype: "video/mp4", fileName: 'video.mp4'}, {quoted: info})
break

case 'tiktok_video':
try {
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} link`);
reagir(from, "🕜")
enviar('Estou processando seu video.')
data = await fetchJson(`https://nodz-apis.com.br/api/downloads/tiktok/dl?url=${q}&apiKey=${API_NODZ}`)
await sock.sendMessage(from, {video: {url: `${data.resultado.play}`}, 
mimetype: "video/mp4"}, {quoted: info});
} catch (error) {
console.error(error);
enviar("Ocorreu um erro, a api caiu ou verifique se o link é de um vídeo.")
}
break;

case 'tiktok_audio':
try {
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} link`);
reagir(from, "🕜")
data = await fetchJson(`https://nodz-apis.com.br/api/downloads/tiktok/dl?url=${q}&apiKey=${API_NODZ}`);
enviar('Estou processando seu audio.')
await sock.sendMessage(from, {audio: {url: `${data.resultado.music}`}, 
mimetype: "audio/mpeg"}, {quoted: info});
} catch (error) {
console.error(error);
enviar("Ocorreu um erro, a api caiu ou verifique se o link é de um vídeo.")
}
break;

case 'instagram':
if(!q) return enviar(`🔹 Uso correto: ${prefixo}instagram link`)
reagir(from, "🕜")
enviar('Estou processando seu video..')
data = await fetchJson(`https://nodz-apis.com.br/api/downloads/instagram/dl?url=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {video: {url: `${data.resultado[0].url}`}, mimetype: "video/mp4"}, {quoted: info});
break

case 'kwai':
if(!q) return enviar(`🔹 Uso correto: ${prefixo}kwai link`)
reagir(from, "🕜")
enviar('Estou processando seu video..')
data = await fetchJson(`https://nodz-apis.com.br/api/downloads/kwai/dl?url=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {video: {url: `${data.resultado.video}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'pin': case 'pinterest':
if(!q) return enviar(`🔹 Uso correto:  ${prefixo + cmd} Luffy`)
reagir(from, "✅");
try {
let datn = await fetchJson(`https://nodz-apis.com.br/api/pesquisas/pinterest?query=${q}&apiKey=${API_NODZ}`);
sock.sendMessage(from, {image: {url: `${datn.resultado.imagens}`}, caption: `🎨 Sua Imagem!`}, {quoted: info})
} catch (e) {
enviar(`Pin Não Encontrado`)
console.log(e)}
break

case 'pin_video':
if(!q) return enviar(`🔹 Uso correto: ${prefixo}pin_video url`)
reagir(from, "🕜")
data = await fetchJson(`https://nodz-apis.com.br/api/downloads/pinterest/dl?url=${q}&apiKey=${API_NODZ}`);
enviar('Estou processando seu video..')
sock.sendMessage(from, {video: {url: `${data.resultado.download}`}}, {quoted: info})
break

case 'igstalk':
if(!q) return enviar(`🔹 Uso correto: ${prefixo + cmd} usuario`)
reagir(from, "🔎")
stalk = await fetchJson(`https://nodz-apis.com.br/api/outras/stalk/instagram?user=${q}&apiKey=${API_NODZ}`)
sock.sendMessage(from, {image: {url: `${stalk.resultado.fotoPerfilHD}`}, caption: `🕵🏻 RESULTADOS:

🫅🏻 *Usuario:* ${stalk.resultado.usuario}
💫 *Nome:* ${stalk.resultado.nomeCompleto}
💬 *Biografia:* ${stalk.resultado.biografia}
👥️️ *Seguidores:* ${stalk.resultado.seguidores}
❤️‍🩹️️ *Seguindo:* ${stalk.resultado.seguindo}
🎨 *Postagens:* ${stalk.resultado.postagens}`}, {quoted: info});
break

case 'gemini': case 'gpt':
if(!q) return enviar(`Em quê eu posso ajudar você?`)
reagir(from, '🧠')
try {
const openan = await fetchJson(`https://nodz-apis.com.br/api/inteligencias/gemini?query=${q},%20resposta%20em%20portugues.&apiKey=${API_NODZ}`)
enviar(`🤖: ${openan.resultado}`)
} catch (e){
return enviar("🤖: Resposta não encontrada.")
}
break

case 'plaq1':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://neon-apis.shop/api/plaq1?texto=${q}`}}, {quoted: info})
break

case 'plaq2':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://neon-apis.shop/api/plaq2?texto=${q}`}}, {quoted: info})
break

case 'plaq3':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://neon-apis.shop/api/plaq3?texto=${q}`}}, {quoted: info})
break

case 'plaq4':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://neon-apis.shop/api/plaq4?texto=${q}`}}, {quoted: info})
break

case 'plaq5':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://neon-apis.shop/api/plaq5?texto=${q}`}}, {quoted: info})
break

case 'waifu':
reagir(from, "✅");
data = await fetchJson(`https://nodz-apis.com.br/api/pesquisas/pinterest?query=waifu&apiKey=${API_NODZ}`);
sock.sendMessage(from, {image: {url: data.resultado.imagens}}, {quoted: info})
break

case 'figu-random':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
async function eitamundobon() {
sock.sendMessage(from, { sticker: { url: `https://neon-apis.shop/api/figu-aleatoria`} })}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundobon()
}
break

case 'figu-raiva':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
async function eitamundoraiva() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-raiva`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundoraiva()
}
break

case 'figu-desenho':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundobcvxx() {
sock.sendMessage(from, { sticker: { url: `https://neon-apis.shop/api/figu-desenho`} })}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundobcvxx()
}
break

case 'figu-flork':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundoflork() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-flork`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundoflork()
}
break

case 'figu-roblox':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundoroblox() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-roblox`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundoroblox()
}
break

case 'figu-anime':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitxmundobom() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-anime`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitxmundobom()
}
break

case 'figu-coreana':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamxndobom() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-coreana`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamxndobom()
}
break

case 'figu-animais':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundoruim() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-animais`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundoruim()
}
break

case 'figu-engracada':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamunzzbom() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-engracada`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamunzzbom()
}
break

case 'figu-emojis':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundobebe() {
sock.sendMessage(from, {sticker: {url: `https://neon-apis.shop/api/figu-emoji`}})}
for (i = 0; i < q; i++) {
await esperar(500)
eitamundobebe()
}
break

// MSG DE COMANDO INEXISTENTE //

default:
if (isCmd) {
enviar("❌️ comando não encontrado ❌️")
}
break;
}

// FINAL DOS COMANDOS

} catch (error) {
console.error('Erro ao processar mensagem:', error);
}
});

// CONEXÃO MENSAGENS //
sock.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update;
if (connection === 'open') {
consoleSucesso('🤖 raya conectada com sucesso!');
} else if (connection === 'close') {
const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
if (shouldReconnect) {
consoleAviso('Tentando reconectar...');
iniciarbot();
} else {
consoleErro('Desconectado. Finalizando...');
}
}
});
}

// Iniciar Bot
iniciarbot();

// Recarregar arquivos editados
fs.watchFile('./index.js', (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    consoleAviso(`Código editado, reiniciando..\n`);
    process.exit();
  }
});
