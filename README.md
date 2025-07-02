# ♻️ Compostagem Inteligente - API

Este é o backend da aplicação **Compostagem Inteligente**, desenvolvido com **Node.js**, **Express** e **MongoDB**. A API oferece funcionalidades como:

- Cadastro e login de usuários com autenticação via JWT
- Gerenciamento de registros de compostagem
- Chat com inteligência artificial sobre dúvidas relacionadas à compostagem
- Documentação da API com Swagger

---

## 📁 Estrutura do Projeto

```
📦 compostagem-api/
├── 📂 controllers/         # Lógicas das rotas
├── 📂 middlewares/         # Middlewares de autenticação
├── 📂 routes/              # Definição de endpoints
├── 📂 config/              # Configurações (como Swagger)
├── 📂 docs/                # Documentação de entrega do projeto
├── 📜 swaggerConfig.js     # Configuração Swagger
├── 📜 server.js            # Arquivo principal
├── 📜 .env                 # Variáveis de ambiente
```

---

## 📄 Documentação do Projeto

Toda a documentação de entrega do projeto está localizada na pasta [`/docs`](./docs) do repositório.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Swagger (Documentação)
- CORS
- dotenv

---

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) ou utilizar o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)

---

## 📥 Como Baixar o Projeto

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/KawannSouza/composta-mais-api.git)

# Acesse a pasta do projeto
cd compostagem-api
```

---

## ⚙️ Configuração do Ambiente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=4000
DATABASE_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
JWT_SECRET=sua_chave_secreta_aqui
```

---

## ▶️ Como Executar o Projeto

```bash
npm run dev
```

> A API estará disponível em: https://composta-mais-api.onrender.com

---

## 📘 Acessar a Documentação da API

A documentação Swagger pode ser acessada em:

(https://composta-mais-api.onrender.com/api-docs)

---

## 🔐 Autenticação

Algumas rotas são protegidas por autenticação JWT.

Após o login (`/users/login`), envie o token JWT no header das requisições:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 📌 Principais Endpoints

### Usuários

- `POST /users/register` – Registra um novo usuário
- `POST /users/login` – Realiza login e retorna JWT
- `PUT /users/:id` – Edita dados do usuário (JWT)
- `DELETE /users/:id` – Exclui usuário (JWT)

### Registros de Compostagem

- `POST /records/` – Cria novo registro (JWT)
- `GET /records/` – Lista registros do usuário autenticado (JWT)

### Chat IA

- `POST /chat` – Envia pergunta sobre compostagem

---

## 🤖 Chat com IA

O endpoint `/chat` permite enviar mensagens relacionadas à compostagem e obter respostas da inteligência artificial.

---

## 📚 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👥 Contribuindo

Sinta-se à vontade para abrir issues, propor melhorias e contribuir com pull requests.

---

## 📬 Contato

- Email: seu-email@dominio.com  
- LinkedIn: [Seu Nome](https://linkedin.com/in/seuusuario)

---
