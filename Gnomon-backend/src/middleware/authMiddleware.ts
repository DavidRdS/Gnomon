// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estende a interface Request do Express para incluir a propriedade 'user'
interface AuthRequest extends Request {
  user?: { userId: number };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  // Verifica se o token está no header de autorização e se começa com "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token (remove a parte "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verifica e decodifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

      // Adiciona os dados do usuário (o ID) ao objeto da requisição
      req.user = { userId: decoded.userId };

      // Passa para a próxima função (o controller)
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Não autorizado, token falhou.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, sem token.' });
  }
};