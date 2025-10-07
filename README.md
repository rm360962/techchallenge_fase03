# Blog Educa

Projeto desenvolvido para a terceira fase da Pós-Tech FIAP.

## Informações do projeto

Aluno: Henrique Jardel Timoteo
RM: rm360962

GitHub do projeto frontend: https://github.com/rm360962/techchallenge_fase03
GitHub do projeto backend:  https://github.com/rm360962/techchallenge_fase02

Usuário cadastrado para teste:

Login: Sistema
Senha: 12345678

## Arquitetura utilizada

A arquitetura adotada neste projeto foi a arquitetura baseada em componentes, que é uma abordagem de desenvolvimento de software que estrutura o sistema como um conjunto de unidades independentes, reutilizáveis e substituíveis.

## Requisitos mínimos

- NodeJs na versão 22 ou maior

## Variáveis de ambiente do projeto de backend

Varíaveis de ambiente para executar o projeto localmente.

- DATABASE_USER=postgres
- DATABASE_HOST=localhost
- DATABASE=postgres
- DATABASE_PASSWORD=1234
- DATABASE_PORT=5432
- JWT_SECRET=dd56e3b80b0e23fb78b161078a6d8ddc

## Comandos do backend

- npm install - Instala todas as dependências da aplicação
- npm run dev - Roda a API(rotas) modo dev
- npm start - Roda a API(rotas) em modo produção
- npm run build - Faz o build da aplicação para rodar em produção
- npm run test - Roda os testes 
- docker compose -f db-dev.yml up - Executa o banco de dados
- docker compose -f db-dev.yml down -v - Limpa os dados do banco

## Comandos do frontend

- npm install - Instala todas as dependências da aplicação
- npm run dev - Roda a API(rotas) modo dev