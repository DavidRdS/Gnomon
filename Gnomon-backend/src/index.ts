// src/index.ts
import app from './server';

const port = 3001;

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
});