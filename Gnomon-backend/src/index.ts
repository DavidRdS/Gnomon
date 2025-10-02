/**
 * @file index.ts
 * @description Ponto de entrada (entrypoint) da aplicação back-end.
 * Este arquivo é responsável por importar a instância do servidor Express
 * e iniciá-la para ouvir por requisições na porta definida.
 */

// Importa a instância configurada do aplicativo Express do arquivo server.ts
import app from './server';

// Define a porta em que o servidor irá operar.
// É uma boa prática usar uma variável de ambiente aqui para produção, mas para desenvolvimento está ótimo.
const port = process.env.PORT || 3001;

// Inicia o servidor e o faz "ouvir" na porta especificada.
app.listen(port, () => {
  // Exibe uma mensagem no console quando o servidor está pronto e no ar.
  console.log(`🚀 Servidor rodando com sucesso em: http://localhost:${port}`);
});