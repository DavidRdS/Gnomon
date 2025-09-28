// src/server.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>API do Gnomon está no ar!</h1>');
});

// Diz ao nosso app para usar as rotas de usuário
app.use('/api/users', userRoutes);

export default app;