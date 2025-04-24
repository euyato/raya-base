#!/bin/sh

# ===== CONFIGURAÇÕES =====
GITHUB_USER="euyato"
REPO_NAME="raya-base"
TOKEN="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"
COMMIT_MESSAGE="raya update"
BRANCH="main" # troque se seu branch for master ou outro
# ==========================

# Checar se está num repositório Git
if [ ! -d ".git" ]; then
  echo "Não é um repositório Git! Inicializando..."
  git init
  git branch -M ${BRANCH}
  git remote add origin https://${GITHUB_USER}:${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git
fi

# Função para checar se o Git está configurado
check_git_config() {
  name=$(git config --global user.name)
  email=$(git config --global user.email)

  if [ -z "$name" ] || [ -z "$email" ]; then
    echo "Git ainda não configurado. Vamos configurar agora!"
    printf "Digite seu nome completo: "
    read name
    printf "Digite seu e-mail do GitHub: "
    read email
    git config --global user.name "$name"
    git config --global user.email "$email"
    echo "Git configurado como: $name <$email>"
  else
    echo "Git já configurado como: $name <$email>"
  fi
}

# Executa a configuração
check_git_config

# Atualiza o remote (caso precise)
git remote set-url origin https://${GITHUB_USER}:${TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git

# Adiciona, commita e envia
git add .
git commit -m "${COMMIT_MESSAGE}"
git push origin ${BRANCH}