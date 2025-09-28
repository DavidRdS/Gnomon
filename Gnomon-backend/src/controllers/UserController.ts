// src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define um "schema" para validar os dados que chegam
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. Valida os dados do corpo da requisição com o Zod
    const { name, email, password } = registerSchema.parse(req.body);

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Salva o usuário no banco de dados com a senha criptografada
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. Retorna uma resposta de sucesso (sem a senha!)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos.', details: error.issues });
    }
    if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno.' });
  }
};