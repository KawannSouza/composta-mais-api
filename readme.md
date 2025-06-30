# API Composta+

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

API para o projeto Composta+, uma plataforma para conectar doadores de resíduos orgânicos a compostadores, facilitando a prática da compostagem e promovendo a sustentabilidade.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Documentação da API (Swagger)](#documentação-da-api-swagger)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Funcionalidades

-   ✅ **Autenticação de Usuários:** Sistema completo de registro e login com tokens JWT.
-   ✅ **Controle de Acesso Baseado em Papéis (RBAC):** Diferentes permissões para usuários `DOADOR` e `COMPOSTADOR`.
-   ✅ **Gerenciamento de Registros:** Endpoints para criar e listar registros de atividades de compostagem.
-   ✅ **Chat com IA:** Integração com o Google Gemini para fornecer dicas e responder dúvidas sobre compostagem.
-   ✅ **Documentação Interativa:** API 100% documentada com Swagger UI para fácil visualização e teste dos endpoints.

---

## Tecnologias Utilizadas

-   **Backend:** Node.js
-   **Framework:** Express.js
-   **ORM / Banco de Dados:** Prisma com MongoDB
-   **Autenticação:** JSON Web Token (jsonwebtoken)
-   **Segurança:** bcryptjs para hashing de senhas
-   **Documentação:** Swagger (swagger-ui-express & swagger-jsdoc)
-   **Desenvolvimento:** Nodemon

---

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
-   [Node.js](https://nodejs.org/en/) (v18 ou superior)
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   Uma instância do MongoDB (pode ser [local](https://www.mongodb.com/try/download/community) ou um cluster na nuvem como o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register))

---

## Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento local:

1.  **Clone o repositório:**
    ```bash
    git clone https://URL_DO_SEU_REPOSITORIO.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd composta-mais-api
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` e renomeie-a para `.env`.
    ```bash
    # No Windows (cmd)
    copy .env.example .env

    # No Linux/macOS
    cp .env.example .env
    ```
    Em seguida, abra o arquivo `.env` e preencha com suas credenciais:
    ```env
    # String de conexão do seu banco de dados MongoDB (local ou Atlas)
    DATABASE_URL="mongodb://..."

    # Chave secreta para gerar os tokens JWT. Use uma string longa e aleatória.
    JWT_SECRET="SEU_SEGREDO_SUPER_SECRETO"

    # Sua chave de API do Google para o serviço Gemini
    GOOGLE_API_KEY="AIzaSy..."
    ```

5.  **Sincronize o banco de dados:**
    Este comando irá criar as coleções no seu banco de dados com base no schema do Prisma.
    ```bash
    npx prisma db push
    ```

6.  **(Opcional) Popule o banco com dados iniciais:**
    Para criar usuários de exemplo, execute o script de seed.
    ```bash
    npx prisma db seed
    ```

---

## Executando a Aplicação

Para iniciar o servidor, use o seguinte comando:

```bash
# Inicia o servidor em modo de desenvolvimento com hot-reload (nodemon)
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## Documentação da API (Swagger)

A documentação completa e interativa da API foi gerada com Swagger e está disponível enquanto o servidor estiver rodando.

**Acesse a documentação em:** [**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

### Como Testar Endpoints Protegidos

Para testar rotas que exigem autenticação (marcadas com um cadeado 🔒), siga estes passos:

1.  Na documentação, vá até a seção `Usuários` e execute o endpoint `POST /users/login` com as credenciais de um usuário válido.
2.  Copie o `token` JWT retornado na resposta.
3.  Clique no botão verde **`Authorize`** no canto superior direito da página.
4.  Na janela que abrir, cole o token no campo de valor (`value`) da seção `bearerAuth` e clique em **"Authorize"**.
5.  Pronto! Agora você pode executar qualquer endpoint protegido, e o Swagger enviará o token de autorização automaticamente.

![Guia de Autorização do Swagger](https://i.imgur.com/83A3oMh.png)

---

## Estrutura do Projeto

```
composta-mais-api/
├── prisma/             # Schema e seed do banco de dados
└── src/
    ├── config/         # Configurações (Prisma Client, Swagger)
    ├── controllers/    # Lógica de negócio da aplicação
    ├── middlewares/    # Middlewares do Express (ex: autenticação)
    ├── routes/         # Definição das rotas e anotações Swagger
    ├── services/       # Comunicação com APIs externas (ex: Google Gemini)
    └── server.js       # Ponto de entrada da aplicação Express
├── .env                # Variáveis de ambiente (locais, não versionadas)
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

---

## Licença
