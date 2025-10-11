# Gnomon — Navegação e Integração no Campus

> PWA para orientar alunos e visitantes no campus, com mapa interativo, catálogo de locais e autenticação.

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-React-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Sumário
- [Visão Geral](#visão-geral)
- [Justificativa](#justificativa)
- [Solução Técnica (PWA)](#solução-técnica-pwa)
- [Funcionalidades](#funcionalidades)
- [Tecnologias e Arquitetura](#tecnologias-e-arquitetura)
- [Como Rodar (dev)](#como-rodar-dev)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados e Prisma](#banco-de-dados-e-prisma)
- [Swagger (Documentação)](#swagger-documentação)
- [Escopo](#escopo)
- [Modelo de Negócio (Futuro)](#modelo-de-negócio-futuro)
- [Equipe](#equipe)
- [Licença](#licença)

---

## Visão Geral
O Projeto Gnomon é uma iniciativa acadêmica (TCC — UNINASSAU) que resolve a dificuldade de orientação espacial de novos alunos e visitantes no campus. Por meio de um Aplicativo Web Progressivo (PWA), o projeto oferece uma solução digital, autônoma e sempre disponível — eliminando a dependência de mapas impressos desatualizados ou de pedir informações a terceiros.

O nome “Gnomon” reflete sua função: atuar como guia confiável, tal qual o gnomon de um relógio solar.

---

## Justificativa
A transição para a universidade traz desafios além da localização: gestão de tempo, carga de disciplinas e pressão pessoal. A dificuldade inicial em se orientar no campus agrava esses problemas e consome energia que poderia ser dedicada às demandas acadêmicas e sociais.

- Campus como “labirinto” para recém-chegados.
- 66,4% dos estudantes relataram falta de informações essenciais (assistência estudantil, saúde, serviços administrativos).

O Gnomon simplifica a navegação, promovendo autonomia e segurança — e acelera a adaptação ao ambiente acadêmico.

---

## Solução Técnica (PWA)
PWA acessível via navegador, instalável na tela inicial do celular e com experiência semelhante a app nativo.

- Acessível em múltiplas plataformas
- Leve e rápido (Vite + React)
- Preparado para uso offline (escopo futuro)

---

## Funcionalidades
- Mapa Interativo do Campus
- Catálogo de Locais com busca e detalhes (salas, banheiros, laboratórios, etc.)
- UX responsiva e intuitiva (mobile-first)
- Autenticação (registro, login, perfil)
- Relacionamento muitos-para-muitos entre Locais e Rotas
- Documentação da API via Swagger

Futuro:
- Navegação em tempo real (indoor)
- Notificações push
- Integrações com sistemas acadêmicos
- Analytics e recursos B2B

---

## Tecnologias e Arquitetura
- Frontend: React + Vite + Tailwind CSS (PWA)
- Backend: Node.js + Express 5 + TypeScript
- Segurança: Helmet, CORS, Rate Limit
- Logs: pino-http
- Banco: PostgreSQL 16 (Docker) — host: 5433
- ORM: Prisma
- Documentação: Swagger (swagger-ui-express + swagger-jsdoc)

Portas padrão:
- Frontend: 5173
- Backend (API): 3001
- Postgres (host→container): 5433→5432

---

## Como Rodar (dev)

Pré-requisitos:
- Node 18+
- Docker Desktop em execução

1) Banco (Docker)
```bash
docker compose up -d
# ver porta mapeada
docker port gnomon-postgres  # → 0.0.0.0:5433

# na pasta do backend
npm install
npm run dev
# Health: http://localhost:3001/health
# Swagger: http://localhost:3001/api/docs

# na pasta do frontend
npm install
npm run dev
# http://localhost:5173


# Variáveis do ambiente
Arquivo: Gnomon-backend/.env

env

# Servidor
PORT=3001
API_BASE_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173,http://127.0.0.1:5173
# Para links públicos (e-mail de reset)
FRONTEND_PUBLIC_URL=http://localhost:5173

# Banco (Postgres no Docker, porta 5433 no host)
DATABASE_URL=postgresql://gnomon:gnomon@localhost:5433/gnomon?schema=public
DIRECT_DATABASE_URL=postgresql://gnomon:gnomon@localhost:5433/gnomon?schema=public

# Auth / E-mail
JWT_SECRET=troque_por_um_segredo_forte
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senha_de_app


#Banco de Dados e Prisma

Provider: PostgreSQL (Prisma)
Migrações:
Bash

npx prisma format
npx prisma migrate dev --name sua_mudanca
npx prisma generate
Visualização:
Bash

npx prisma studio
pgAdmin (opcional): host localhost, port 5433, db gnomon, user gnomon, pass gnomon.
Tabelas principais: usuarios, mapas, locais, rotas e a tabela de junção (Local ↔ Route) gerada pelo Prisma.


#Swagger (Documentação)

UI: http://localhost:3001/api/docs
JSON: http://localhost:3001/api/docs.json
Segurança Bearer JWT configurada (bearerAuth).
As anotações vivem em src/docs/**/*.ts e em comentários @openapi nas rotas.

Escopo
Incluído:

PWA funcional
Mapeamento e catálogo de locais
Exibição de informações detalhadas
Documentação e testes básicos
Futuro:

Navegação em tempo real (GPS indoor)
Notificações push
Integração com calendário acadêmico/sistemas da universidade
Monetização B2B (analytics, painel administrativo)
Modelo de Negócio (Futuro)
Pensado para licenciamento B2B (instituições parceiras), não para o usuário final. Possibilidades:

Assinatura institucional
Recursos premium (analytics, integrações)
Equipe
Gestor do Projeto: João Marcos Ferreira Vilela
Membros: Lucas Hiago de Paulo Barbosa, David Roberto da Silva Sousa
Patrocinador: Professor Antonio Almeida
Licença
Este projeto é licenciado sob a Licença MIT.