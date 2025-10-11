/**
 * @file server.ts
 * @description Arquivo principal de configuração do servidor Express.
 * Este arquivo é responsável por criar a instância do app, aplicar os middlewares
 * globais e registrar os módulos de rotas da aplicação.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';

// Importa os módulos de rotas da aplicação.
import userRoutes from './routes/userRoutes';
import localRoutes from './routes/localRoutes'; // Importa as rotas de locais

// Swagger
import { setupSwagger } from './docs/swagger';
import 'dotenv/config';

// Cria a instância principal do aplicativo Express.
const app = express();

// Se estiver atrás de proxy (Render, Vercel, Nginx...), preserve IP real para rate limit e logs
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// --- Configuração de Middlewares Globais ---

/**
 * @middleware helmet
 * @description Define headers de segurança padrão.
 */
app.use(helmet());

/**
 * @middleware cors
 * @description Habilita CORS com lista de origens permitidas.
 * Use FRONTEND_URL com múltiplas URLs separadas por vírgula (sem espaços),
 * ex: FRONTEND_URL=https://meusite.com,http://localhost:5173
 */
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/**
 * @middleware express.json
 * @description Parser de JSON nativo do Express.
 */
app.use(express.json());

/**
 * @middleware rateLimit
 * @description Limita o número de requisições por IP em uma janela de tempo.
 */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 300, // até 300 req por IP nesse período
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/**
 * @middleware pino-http
 * @description Logger HTTP performático para requests/responses.
 */
app.use(pinoHttp());

// --- Registro de Rotas (Endpoints) ---

/**
 * @route GET /
 * @description Rota raiz para uma verificação rápida de saúde da API (health check).
 * Útil para confirmar se o servidor está no ar.
 */
app.get('/', (_req, res) => {
  res.send('<h1>API do Gnomon está no ar!</h1>');
});

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
app.get('/health', (_req, res) => res.json({ ok: true }));

// Swagger (após os middlewares globais e antes de qualquer catch-all 404)
setupSwagger(app);

/**
 * @description Registra o módulo de rotas de usuários sob o prefixo '/api/users'.
 * Ex: /api/users/register, /api/users/login
 */
app.use('/api/users', userRoutes);

/**
 * @description Registra o módulo de rotas de locais sob o prefixo '/api/locais'.
 * Ex: /api/locais, /api/locais/1
 */
app.use('/api/locais', localRoutes);

// Exporta a instância 'app' para que o 'index.ts' possa iniciá-la.
export default app;