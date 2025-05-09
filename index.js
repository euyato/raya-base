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

const { prefixo, botName, API_KEY_NEXUS, donoName, NumeroDono, fotomenu } = require('./dono/settings.json')

// INÍCIO DA CONEXAO //
async function iniciarbot() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'debug', stream: 'store' }) });
const { state, saveCreds } = await useMultiFileAuthState('./arquivos/raya-code');
const { version } = await fetchLatestBaileysVersion();
const msgRetryCounterCache = new NodeCache()

const sock = makeWASocket({
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

case 'ping': {
reagir(from, '⚡️')
r = (Date.now() / 1000) - info.messageTimestamp
uptime = process.uptime()
var ping = `${tempo}, Usuário: ${sender.split("@")[0]}\n\n🖥 *Sistema operacional:* ${infoSystem.type()}\n⚙️ *Versão:* ${infoSystem.release()}\n⏰️ *Horario atual:* ${hora}\n📆 *Data atual:* ${data}\n🤖 *Tempo online:* ${kyun(uptime)}\n📊 *Comandos totais:* ${totalcmds}\n🗂 *Memoria ram total:* ${(infoSystem.totalmem()/Math.pow(1024, 3)).toFixed(2)} GB\n🗂 *Memoria ram livre:* ${(infoSystem.freemem()/Math.pow(1024, 3)).toFixed(2)} GB`
await sock.sendMessage(from, { image: { url: `https://nexus-api.shop/api/ping?fundo=https://files.catbox.moe/lz9h73.jpeg&text1=RAYA%20BOT&text2=${String(r.toFixed(3))}&text3=%3E%3E%20SPEED%20BOT%20%3C%3C&avatar=https://files.catbox.moe/o7dtdq.jpeg` }, caption: ping}, {quoted: info})
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

case 'play':
if(!q) return enviar(`Olá ${pushname}, Você  esqueceu do nome da música Ex: play teto`)
reagir(from, "🕜")
enviar('Estou pesquisando seu audio..')
nexus = await fetchJson(`https://nexus-api.shop/youtube/play2?query=${q}&apikey=${API_KEY_NEXUS}`)
sock.sendMessage(from, {image: {url: `${nexus.imagem}`}, caption: `╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─ׅ͚᷂࠭━⵿໋݊┅᮫━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝࣭۟۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┆ 📝 *titulo:* ${nexus.titulo}
「 ✦ 」 
┆ ⌛️ *tempo:* ${nexus.tempo}
「 ✦ 」 
┆ 🎗 *canal:* ${nexus.canal}
「 ✦ 」 
┆ 🌐 *views:* ${nexus.views}
╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈╯`}, {quoted: info})
sock.sendMessage(from, {audio: {url: `${nexus.audio}`}, mimetype: "audio/mpeg"}, {quoted: info})
break

case 'playvid':
if(!q) return enviar(`Olá ${pushname}, Você  esqueceu do nome do video Ex: ${prefix}playvid teto`)
reagir(from, "🕜")
nexus = await fetchJson(`https://nexus-api.shop/youtube/search?query=${q}&apikey=${API_KEY_NEXUS}`)
enviar('Estou pesquisando seu video..')
sock.sendMessage(from, {image: {url: `${nexus.resultado[0].image}`}, caption: `╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─ׅ͚᷂࠭━⵿໋݊┅᮫━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝࣭۟۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┆ 📝 *titulo:* ${nexus.resultado[0].title}
「 ✦ 」
┆ ⌛️ *tempo:* ${nexus.resultado[0].timestamp}
「 ✦ 」
┆ 🎗 *canal:* ${nexus.resultado[0].author.name}
「 ✦ 」
┆ 🌐 *views:* ${nexus.resultado[0].views}
╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─ׅ͚᷂࠭━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝━⵿໋݊┅᮫࣭۫𝆬࣪࣪┅⵿᳝۟۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈╯`}, {quoted: info})
sock.sendMessage(from, {video: {url: `https://nexus-api.shop/youtube/mp4?url=${nexus.resultado[0].url}&apikey=${API_KEY_NEXUS}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'mp3':
if(!q) return enviar('Cadê o link do Youtube?');
sock.sendMessage(from, {audio: {url: `https://nexus-api.shop/youtube/mp3?url=${q}&apikey=${API_KEY_NEXUS}`}, mimetype: "audio/mpeg"}, {quoted: info})
break

case 'mp4':
if(!q) return enviar('Cadê o link do Youtube?');
sock.sendMessage(from, {video: {url: `https://nexus-api.shop/youtube/mp4?url=${q}&apikey=${API_KEY_NEXUS}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'tiktok':
try {
if(!q) return enviar('Cadê o link do Tiktok?');
reagir(from, "🕜")
enviar('Estou processando seu video..')
nexus = await fetchJson(`https://nexus-api.shop/tiktok/video?url=${q}&apikey=${API_KEY_NEXUS}`)
await sock.sendMessage(from, {video: {url: `${nexus.video}`}, 
mimetype: "video/mp4"}, {quoted: info});
} catch (error) {
  console.error(error);
 enviar("Deu um pequeno erro ao realizar o dowload do video")
}
break;

case 'instagram':
if(!q) return enviar(`Você esqueceu de colocar a url Exemplo: ${prefix}instagram url`)
reagir(from, "🕜")
enviar('Estou processando seu video..')
sock.sendMessage(from, {video: {url: `https://nexus-api.shop/api/instagram?url=${q}&apikey=${API_KEY_NEXUS}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'kwai':
if(!q) return enviar(`Você esqueceu de colocar a url Ex: ${prefix}kwai url`)
reagir(from, "🕜")
enviar('Estou processando seu video..')
sock.sendMessage(from, {video: {url: `https://nexus-api.shop/api/kwai?url=${q}&apikey=${API_KEY_NEXUS}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'pin': case 'pinterest':
if(!q) return enviar(`Exemplo: ${prefix}pin Luffy`)
reagir(from, "🕜")
try {
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/pinterest?q=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
} catch (e) {
enviar(`Pin Não Encontrado`)
console.log(e)}
break

case 'pinvid':
if(!q) return enviar(`Você esqueceu de colocar a url Exemplo: ${prefix}pinvid url`)
reagir(from, "🕜")
enviar('Estou processando seu video..')
sock.sendMessage(from, {video: {url: `https://nexus-api.shop/api/pinvideo?url=${q}&apikey=${API_KEY_NEXUS}`}, mimetype: "video/mp4"}, {quoted: info})
break

case 'igstalk': case 'instastalk':
reagir(from, "🕜")
if(!q) return enviar(`Exemplo: ${command} nome`);
var ABC = await fetchJson(`https://nexus-api.shop/stalk/instagram?username=${q}&apikey=${API_KEY_NEXUS}`)
var abcdx = `⚝ *USERNAME:* ${ABC.resultado.usuario}\n⚝ *NOME:* ${ABC.resultado.nome_completo}\n⚝ *BIO:* ${ABC.resultado.biografia}\n⚝ *POSTS:* ${ABC.resultado.postagens}\n⚝ *SEGUIDORES:* ${ABC.resultado.seguidores}\n⚝ *SEGUINDO:* ${ABC.resultado.seguindo}`;
sock.sendMessage(from, {image: {url: `${ABC.resultado.foto_perfil_hd}`}, caption: abcdx}, {quoted: info})
break;

case 'tiktokstalk': case 'tikstalk':
reagir(from, "🕜")
if(!q) return enviar(`Exemplo: ${command} nome`);
ABC = await fetchJson(`https://nexus-api.shop/stalk/tiktok?username=${q}&apikey=${API_KEY_NEXUS}`)
var abcdx = `⚝ *USERNAME:* ${ABC.resultado.usuario}\n⚝ *NOME:* ${ABC.resultado.apelido}\n⚝ *BIO:* ${ABC.resultado.biografia}\n⚝ *POSTS:* ${ABC.resultado.videos}\n⚝ *CURTIDAS:* ${ABC.resultado.curtidas}\n⚝ *SEGUIDORES:* ${ABC.resultado.seguidores}\n⚝ *SEGUINDO:* ${ABC.resultado.seguindo}`;
sock.sendMessage(from, {image: {url: `${ABC.resultado.avatar}`}, caption: abcdx}, {quoted: info})
break;

case 'gpt': case 'gemini':
if(!q) return enviar(`Em quê eu posso ajudar você?`)
try {
const openaxz = await fetchJson(`https://nexus-api.shop/api/gemini?q=${q}&apikey=${API_KEY_NEXUS}`)
enviar(`${openaxz.resposta}`)
} catch (e){
return enviar("Resposta não encontrada..")
}
break

case 'plaq':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq1':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq1?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq2':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq2?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq3':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq3?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq4':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq4?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq5':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq5?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq6':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq6?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq7':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq7?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'plaq8':
if(!q) return enviar(`Cadê o nick?`)
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/api/plaq8?texto=${q}&apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'waifu':
enviar('Estou processando..')
sock.sendMessage(from, {image: {url: `https://nexus-api.shop/random/waifu2?apikey=${API_KEY_NEXUS}`}}, {quoted: info})
break

case 'metadinha':
try {
MET = await fetchJson(`https://nexus-api.shop/random/metadinha?apikey=${API_KEY_NEXUS}`);
sock.sendMessage(from, {image: {url: MET.masculina}, caption: `*HOMEM*`}, {quoted: info})
sock.sendMessage(from, {image: {url: MET.feminina}, caption: `*MULHER*`}, {quoted: info})
} catch (e) {
enviar(`alguma coisa deu errado.`)
}
break;

case 'figu-random':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
async function eitamundobon() {
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-comum?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-raiva?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-desenho?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-flork?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-roblox?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-anime?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-coreana?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-animais?apikey=${API_KEY_NEXUS}`} })}
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
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-engracada?apikey=${API_KEY_NEXUS}`} })}
for (i = 0; i < q; i++) {
await esperar(500)
eitamunzzbom()
}
break

case 'figu-bebe':
if (!q) return enviar('cadê a quantidade?')
if (!q > 10) return enviar('O limite máximo é de 10 figurinhas!');
enviar('Enviando suas figurinhas..')
await esperar(1000)
async function eitamundobebe() {
sock.sendMessage(from, { sticker: { url: `https://nexus-api.shop/sticker-bebe?apikey=${API_KEY_NEXUS}`} })}
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