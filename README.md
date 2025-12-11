# Sistema de Cadastro e Login

Sistema de autenticação desenvolvido com React, Vite e Tailwind CSS, incluindo funcionalidades de cadastro de usuários com integração ao ViaCEP para autopreenchimento de endereços.

## 📋 Funcionalidades

- ✅ Página de Login com validação
- ✅ Página de Cadastro com formulário completo
- ✅ Integração com ViaCEP para autopreenchimento de endereço
- ✅ Banco de dados fake com JSON Server
- ✅ Navegação entre páginas com React Router
- ✅ Interface moderna e responsiva com Tailwind CSS

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento para aplicações React
- **JSON Server** - API REST fake para desenvolvimento
- **ViaCEP API** - API pública para consulta de CEPs

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## 🚀 Como Executar o Projeto

### 1. Instalar as Dependências

Primeiro, instale todas as dependências do projeto:

```bash
npm install
```

### 2. Iniciar o JSON Server

Em um terminal, inicie o servidor JSON Server que simula o banco de dados:

```bash
npm run server
```

O servidor será iniciado na porta **3001** e você verá uma mensagem similar a:

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3001/users

Home
http://localhost:3001
```

**⚠️ Importante:** Mantenha este terminal aberto enquanto estiver usando a aplicação.

### 3. Iniciar a Aplicação React

Em **outro terminal**, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação será iniciada e você verá uma mensagem indicando a URL local (geralmente `http://localhost:5173`).

### 4. Acessar a Aplicação

Abra seu navegador e acesse a URL fornecida pelo Vite (geralmente `http://localhost:5173`).

## 📁 Estrutura do Projeto

```
cadastro-e-login/
├── db.json                 # Banco de dados fake (JSON Server)
├── index.html              # HTML principal
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── README.md               # Este arquivo
└── src/
    ├── main.jsx            # Ponto de entrada da aplicação
    ├── App.jsx             # Componente principal com rotas
    ├── index.css           # Estilos globais
    ├── assets/
    │   └── bg.jfif         # Imagem de fundo
    └── pages/
        ├── Login.jsx       # Página de login
        └── Cadastro.jsx    # Página de cadastro
```

## 🎯 Como Usar

### Página de Login

1. Acesse a aplicação no navegador
2. Você será redirecionado automaticamente para a página de login
3. Digite um email e senha de um usuário cadastrado no `db.json`
4. Clique em "Login" para autenticar

**Usuários de exemplo:**
- Email: `joao@example.com` | Senha: `senha123`
- Email: `maria@example.com` | Senha: `senha456`

### Página de Cadastro

1. Na página de login, clique em "Registre-se" ou acesse `/cadastro`
2. Preencha todos os campos obrigatórios (marcados com *)
3. **Funcionalidade ViaCEP:** Ao digitar o CEP e sair do campo, o sistema automaticamente preencherá:
   - Logradouro
   - Bairro
   - Cidade
   - Estado
4. Clique em "Cadastra-se" para criar sua conta
5. Após o cadastro, você será redirecionado para a página de login

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento Vite
- `npm run build` - Cria uma build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run server` - Inicia o JSON Server na porta 3001
- `npm run lint` - Executa o linter ESLint

## 📝 Banco de Dados (JSON Server)

O arquivo `db.json` contém os dados dos usuários. Você pode:

- **Visualizar todos os usuários:** `GET http://localhost:3001/users`
- **Criar novo usuário:** `POST http://localhost:3001/users`
- **Buscar usuário por ID:** `GET http://localhost:3001/users/:id`
- **Atualizar usuário:** `PUT http://localhost:3001/users/:id`
- **Deletar usuário:** `DELETE http://localhost:3001/users/:id`

### Estrutura de um Usuário

```json
{
  "id": 1,
  "name": "Nome Completo",
  "cpf": "123.456.789-00",
  "email": "email@example.com",
  "password": "senha123",
  "cep": "01310-100",
  "street": "Rua Exemplo",
  "neighborhood": "Bairro",
  "city": "Cidade",
  "state": "SP"
}
```

## 🌐 Integração ViaCEP

A aplicação utiliza a API pública do ViaCEP para buscar informações de endereço a partir do CEP. Quando o usuário digita um CEP válido (8 dígitos) e sai do campo, a aplicação:

1. Faz uma requisição para `https://viacep.com.br/ws/{cep}/json/`
2. Recebe os dados do endereço
3. Preenche automaticamente os campos: Logradouro, Bairro, Cidade e Estado

## ⚠️ Observações Importantes

- Este projeto é destinado apenas para uso **local**
- O JSON Server deve estar rodando para que o cadastro e login funcionem
- Os dados são armazenados apenas localmente no arquivo `db.json`
- Não há validação de CPF ou senha forte implementada (apenas campos obrigatórios)
- As senhas são armazenadas em texto plano (não recomendado para produção)

## 🐛 Solução de Problemas

### Erro ao fazer login ou cadastro

- Verifique se o JSON Server está rodando na porta 3001
- Certifique-se de ter executado `npm run server` antes de usar a aplicação

### CEP não está sendo preenchido

- Verifique sua conexão com a internet (a API ViaCEP requer conexão)
- Confirme que o CEP digitado tem 8 dígitos e é válido
- Verifique o console do navegador para possíveis erros

### Porta já está em uso

- Se a porta 3001 estiver ocupada, você pode alterar no script do `package.json`
- Se a porta do Vite (5173) estiver ocupada, o Vite tentará usar outra porta automaticamente

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico.

---

**Desenvolvido com ❤️ usando React + Vite + Tailwind CSS**
