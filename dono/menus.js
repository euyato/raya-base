
const menu = (donoName, botName, prefixo, sender) => { 
return `╭─⟢ 𝙄𝙉𝙁𝙊 𝘿𝘼 𝙍𝘼𝙔𝘼
│🤖 Nome: ${botName}
│👤 Usuário: @${sender.split("@")[0]}
│👑 Dono: ${donoName}
│🛠️ Versão: 1.0.0
╰─────────────⟡

╭─⟢ 𝘼𝘿𝙈𝙄𝙉𝙎
│➕ ${prefixo}add (@marque)
│⛔ ${prefixo}banir (número)
│⬆️ ${prefixo}promover (@marque)
│⬇️ ${prefixo}rebaixar (@marque)
│⚡ ${prefixo}ping
│ℹ️ ${prefixo}infodono
│💡 ${prefixo}sugestao
│⭐ ${prefixo}avalie
╰─────────────⟡

╭─⟢ 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙎
│💽 ${prefixo}play (nome)
│📽 ${prefixo}play_video (nome)
│📽 ${prefixo}tiktok
│📽 ${prefixo}instagram
│📽 ${prefixo}kwai
│📽 ${prefixo}pin_video
╰─────────────⟡

╭─⟢ 𝙁𝙄𝙂𝙐𝙍𝙄𝙉𝙃𝘼𝙎
│🎲 ${prefixo}sticker
│🎲 ${prefixo}toimg
│🎲 ${prefixo}rename
│🎲 ${prefixo}figu-random
│🎲 ${prefixo}figu-raiva
│🎲 ${prefixo}figu-desenho
│🎲 ${prefixo}figu-flork
│🎲 ${prefixo}figu-roblox
│🎲 ${prefixo}figu-anime
│🎲 ${prefixo}figu-coreana
│🎲 ${prefixo}figu-animais
│🎲 ${prefixo}figu-engracada
│🎲 ${prefixo}figu-bebe
╰─────────────⟡

╭─⟢ 𝘼𝙇𝙀𝘼𝙏𝙊𝙍𝙄𝙊𝙎
│🧠 ${prefixo}gpt (pergunta)
│🎭 ${prefixo}plaq 1-5 
│🎭 ${prefixo}igstalk (nome)
│🎭 ${prefixo}tiktokstalk (nome)
│❤️ ${prefixo}waifu
│❤️ ${prefixo}pinterest
│❤️ ${prefixo}metadinha
╰─────────────⟡`
}
exports.menu = menu