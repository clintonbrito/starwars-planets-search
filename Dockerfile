# Use a imagem base do Node.js 16
FROM node:16-alpine

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração do projeto
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o conteúdo do projeto para o contêiner
COPY . .

# Configure a porta na qual o aplicativo irá escutar
EXPOSE 3000

# Comando para iniciar o aplicativo
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]