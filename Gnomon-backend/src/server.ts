/**
 * @file server.ts
 * @description Arquivo principal de configuração do servidor Express.
 * Este arquivo é responsável por criar a instância do app, aplicar os middlewares
 * globais e registrar os módulos de rotas da aplicação.
 */

// Importa as dependências necessárias.
import express from 'express';
import cors from 'cors';

// Importa os módulos de rotas da aplicação.
import userRoutes from './routes/userRoutes';
import localRoutes from './routes/localRoutes'; // Importa as rotas de locais

// Cria a instância principal do aplicativo Express.
const app = express();

// --- Configuração de Middlewares Globais ---

/**
 * @middleware cors
 * @description Habilita o Cross-Origin Resource Sharing (CORS).
 * Essencial para permitir que o front-end (React), rodando em um domínio/porta diferente,
 * possa fazer requisições para esta API.
 */
app.use(cors());

/**
 * @middleware express.json
 * @description Habilita o parser de JSON nativo do Express.
 * Isso permite que o servidor entenda e processe corpos de requisição
 * enviados no formato JSON (ex: nos formulários de login e cadastro).
 */
app.use(express.json());


// --- Registro de Rotas (Endpoints) ---

/**
 * @route GET /
 * @description Rota raiz para uma verificação rápida de saúde da API (health check).
 * Útil para confirmar se o servidor está no ar.
 */
app.get('/', (req, res) => {
  res.send('<h1>API do Gnomon está no ar!</h1>');
});

/**
 * @description Registra o módulo de rotas de usuários sob o prefixo '/api/users'.
 * Todas as rotas definidas em 'userRoutes.ts' serão acessíveis a partir deste prefixo.
 * Ex: /api/users/register, /api/users/login
 */
app.use('/api/users', userRoutes);

/**
 * @description Registra o módulo de rotas de locais sob o prefixo '/api/locais'.
 * Todas as rotas definidas em 'localRoutes.ts' serão acessíveis a partir deste prefixo.
 * Ex: /api/locais, /api/locais/1
 */
app.use('/api/locais', localRoutes);


// Exporta a instância 'app' para que o 'index.ts' possa iniciá-la.
export default app;