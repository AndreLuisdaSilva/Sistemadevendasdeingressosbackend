🎟 Sistema de Vendas de Ingressos - Backend

Este repositório contém o backend do Sistema de Vendas de Ingressos, uma API desenvolvida para gerenciar eventos, ingressos e compras.

🚀 Tecnologias Utilizadas

Node.js - Ambiente de execução JavaScript

Express.js - Framework para criação da API REST

PostgreSQL - Banco de dados relacional

Sequelize - ORM para interação com o banco de dados

Docker - Containerização do ambiente

TypeScript - Tipagem estática para JavaScript

📦 Configuração do Ambiente

1️⃣ Clonar o Repositório

git clone https://github.com/AndreLuisdaSilva/Sistemadevendasdeingressosbackend.git
cd Sistemadevendasdeingressosbackend

2️⃣ Instalar Dependências
```bash
npm install
```
3️⃣ Configurar as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e configure as variáveis necessárias, como credenciais do banco de dados.

4️⃣ Subir o Banco de Dados com Docker

docker-compose up -d

5️⃣ Executar a API
```bash
npm run dev
```
📌 Endpoints Principais

Autenticação: /auth/login, /auth/register

Eventos: /events (CRUD de eventos)

Ingressos: /tickets (Compra, reserva e gestão de ingressos)

Usuários: /users (Gestão de usuários e perfis)

✅ Testes

Para rodar os testes unitários, utilize:
```bash
npm test
```

💡 Contribuição: Caso queira contribuir, sinta-se à vontade para abrir uma issue ou um pull request! 🚀
