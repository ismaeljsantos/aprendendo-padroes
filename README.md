# Aprendendo Padrões

Este projeto foi criado com o objetivo de aprender e implementar padrões de design de software e boas práticas no desenvolvimento de aplicações Node.js.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para desenvolvimento backend.
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM para manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Jest**: Framework para testes unitários.
- **JWT**: Gerenciamento de autenticação via tokens.

## Funcionalidades

- **Cadastro de Usuários**: Criação de novos usuários com dados como nome, email e CPF.
- **Autenticação**: Login de usuários com autenticação JWT.
- **Criptografia de Dados**: Implementação de criptografia e descriptografia para o CPF.
- **Validação de CPF**: Suporte a CPFs com e sem pontuação, garantindo dados válidos.
- **Gerenciamento de Endereços**: Relacionamento entre usuários e seus endereços.

## Como Rodar o Projeto

### 1. Clone o repositório:

```bash
    git clone https://github.com/ismaeljsantos/aprendendo-padroes.git
```

### 2. Instale as dependências:

```bash
    npm install
```

### 3. Configure as variáveis de ambiente no arquivo .env:

```bash
    DATABASE_URL=<url_do_banco_de_dados>
    JWT_SECRET=so-jesus-salva
```

### 4. Execute a aplicação:

```bash
    npm start
```

### 5. Execute os testes:

```bash
    npm test
```

## Estrutura do Projeto

```plaintext
src/
├── controllers/ # Controladores da API
├── domain/ # Entidades e regras de negócio
├── infrastructure/ # Configuração do banco de dados
├── repositories/ # Manipulação de dados no banco
├── routes/ # Definição de rotas
├── useCases/ # Casos de uso da aplicação
├── utils/ # Funções auxiliares (ex.: validação de CPF)
tests/
├── utils/ # Testes unitários de funções auxiliares
```

## Rotas Disponíveis

| Método | Rota/Endpoint | Descrição                   |
| ------ | ------------- | --------------------------- |
| POST   | /users        | Cadastra um novo usuário    |
| GET    | /users        | Lista todos os usuários     |
| GET    | /users/:id    | Busca um usuário pelo ID    |
| PUT    | /users/:id    | Atualiza um usuário pelo ID |
| POST   | /users/login  | Login com autenticação JWT  |

## Contribuição

Se você deseja contribuir com o projeto, siga os passos abaixo:

#### 1. Faça um fork do repositório.

#### 2. Crie uma branch para sua feature:

```bash
    git checkout -b minha-feature
```

#### 3. Commit suas alterações

```bash
    git commit -m "feat: add new feature"
```

aqui deve segui o seguinte padrão de commit, a frase deve esta em inglês, e seguir e sequinte convensão https://www.conventionalcommits.org/pt-br/v1.0.0/

#### 4. Faça o push da branch para o repositório remoto:

```bash
    git push origin minha-feature
```

#### 5. Abra uma pull request para a branch master do repositório original.
