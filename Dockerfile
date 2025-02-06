# Usando uma versão mais recente do Node.js
FROM node:21.7.2

# Definindo o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiando package.json e package-lock.json primeiro para aproveitar cache do Docker
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todo o código da aplicação
COPY . .

# Rodando a build da aplicação (isso é necessário se você tiver uma build step)
RUN npm run build

# Expondo a porta que a aplicação usará
EXPOSE 3000

# Iniciando a aplicação (após a construção)
CMD ["npm", "start"]
