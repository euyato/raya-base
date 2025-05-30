const menu = (donoName, botName, prefixo, sender) => { 
return `╭─⟢ 
│ 🤖 Nome: ${botName}
│ 👤 Usuário: @${sender.split("@")[0]}
│ 👑 Dono: ${donoName}
│ ⚙️ Prefixo: [ ${prefixo} ]
│ 🛠️ Versão: 1.5.0
╰─────────────⟡

╭─⟢ 🛡️ *ADMINS - DONO*
│ ⚙️ ${prefixo}prefixo-bot
│ ➥ Alterar o prefixo
│ ⚙️ ${prefixo}nome-bot
│ ➥ Alterar o nome do robo
│ ⚙️ ${prefixo}nick-dono
│ ➥ Alterar o nome do dono
│ ⚙️ ${prefixo}numero-dono
│ ➥ Alterar o numero dono
│ 🎀 ${prefixo}add 558899..
│ ➥ Adiciona um novo membro
│ 🔒 ${prefixo}banir @usuário
│ ➥ Remove e bloqueia do grupo
│ ⬆️ ${prefixo}promover @usuário
│ ➥ Torna o membro um admin
│ ⬇️ ${prefixo}rebaixar @usuário
│ ➥ Remove permissão de admin
│ ⚙️ ${prefixo}ping
│ ➥ Testa a velocidade do bot
│ 🧠 ${prefixo}infodono
│ ➥ Informações do criador
│ 💬 ${prefixo}sugestao [texto]
│ ➥ Envie uma sugestão ao dono
│ 🌟 ${prefixo}avalie [nota]
│ ➥ Der sua avaliaçao
╰─────────────⟡

╭─⟢ ⬇️ *DOWNLOADS*
│ 🎧 ${prefixo}play_audio (nome)
│ ➥ Download audio do youtube
│ 🎬 ${prefixo}play_video (nome)
│ ➥ Download video do youtube
│ 📁 ${prefixo}play_doc (nome)
│ ➥ Download documento video
│ 🎵 ${prefixo}tiktok_audio (link)
│ ➥ Download audio do tiktok
│ 🎥 ${prefixo}tiktok_video (link)
│ ➥ Download video do tiktok
│ 📸 ${prefixo}instagram (link)
│ ➥ Download video do instagram
│ 🎞️ ${prefixo}kwai (link)
│ ➥ Download video do kwai
│ 🎬 ${prefixo}pin_video (link)
│ ➥ Download video do pinterest
╰─────────────⟡

╭─⟢ 🖼️ *FIGURINHAS*
│ 🎲 ${prefixo}sticker (menc-foto)
│ ➥ Converter imagem em sticker
│ 🖼️ ${prefixo}toimg (menc-sticker)
│ ➥ Reverter sticker para imagem
│ ⭐️ ${prefixo}rename (menc-sticker)
│ ➥ Renomeia descricao do sticker
│ 🔀 ${prefixo}figu-random ex: 5
│ ➥ Pacotes de figurinhas
│ 😡 ${prefixo}figu-raiva ex: 5
│ ➥ Pacotes de figurinhas
│ 🎨 ${prefixo}figu-desenho ex: 5
│ ➥ Pacotes de figurinhas
│ 😂 ${prefixo}figu-engracada ex: 5
│ ➥ Pacotes de figurinhas
│ 🤖 ${prefixo}figu-roblox ex: 5
│ ➥ Pacotes de figurinhas
│ 🌸 ${prefixo}figu-coreana ex: 5
│ ➥ Pacotes de figurinhas
│ 🐾 ${prefixo}figu-animais ex: 5
│ ➥ Pacotes de figurinhas
│ 💫 ${prefixo}figu-anime ex: 5
│ ➥ Pacotes de figurinhas
│ 😜 ${prefixo}figu-emojis ex: 5
│ ➥ Pacotes de figurinhas
│ 🧼 ${prefixo}figu-flork ex: 5
│ ➥ Pacotes de figurinhas
╰─────────────⟡

╭─⟢ 🎲 *ALEATORIOS*
│ 🧠 ${prefixo}gpt (pergunta)
│ ➥ Inteligencia artificial
│ 🎨 ${prefixo}plaq 1-5 (nome)
│ ➥ Imagem garotas de calsinha
│ 🕵🏻 ${prefixo}igstalk (nome)
│ ➥ Investigar perfil instagram 
│ ❤️ ${prefixo}waifu (foto)
│ ➥ Imagem erotica
│ 🎨 ${prefixo}pinterest (nome)
│ ➥ Pesquisa de imagens
╰─────────────⟡`;
}
exports.menu = menu