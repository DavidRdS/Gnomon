import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authH = req.headers.authorization;
    if (!authH?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token ausente' });
    }
    const token = authH.split(' ')[1];
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret);
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'sub' in decoded &&
      'email' in decoded
    ) {
      // anexe no req para uso posterior
      (req as any).user = decoded as unknown as { sub: number; email: string };
      next();
    } else {
      return res.status(401).json({ message: 'Token inválido' });
    }
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}