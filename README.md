# 🚀 App Gestor de Projetos (Frontend)

Este é o frontend (client-side) do projeto "Apan", construído com React, TypeScript e CSS Modules. Ele consome a [API do Backend](https://github.com/leticiaArauj0/apan-backend) para autenticação e gerenciamento de dados.

**Status do Projeto:** Em Desenvolvimento 🚧

---

## 🛠️ Tecnologias Principais

* **React.js** (v18)
* **TypeScript**
* **React Router (v6)** (para roteamento)
* **Axios** (para requisições HTTP)
* **React Context API** (para gerenciamento de estado de autenticação)
* **CSS Modules** (para componentização de estilos)

---

## ✨ Funcionalidades

* **Fluxo de Autenticação Completo:**
    * Páginas de Login e Registro com validação.
    * Gerenciamento de estado global (Context) para `user` e `token`.
    * Armazenamento do token em `localStorage`.
    * Interceptor `axios` que anexa automaticamente o token JWT em todas as requisições.
* **Rotas Protegidas:**
    * Uso de componentes `ProtectedRoute` e `PublicOnlyRoute` para garantir que o usuário só acesse as páginas corretas (logado ou deslogado).
* **Componentização:**
    * Componentes reutilizáveis como `Input` e `Button`.

---

## 🏁 Como Rodar o App (Localmente)

### 1. Pré-requisito (IMPORTANTE)

Este frontend **NÃO** funcionará sozinho. Ele precisa que a [API do Backend](https://github.com/leticiaArauj0/apan-backend) esteja rodando localmente na porta `5000`.

**➡️ Siga as instruções do repositório do backend primeiro.**

### 2. Configuração do Projeto

1.  **Clone este repositório** (se ainda não o fez).
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento do React:**
    ```bash
    npm run dev
    # (Ou 'npm start', dependendo do seu package.json)
    ```
✅ O aplicativo React estará rodando em `http://localhost:3000` (ou `5173`, ou a porta que seu terminal indicar).

Basta abrir essa URL no seu navegador para usar o app.