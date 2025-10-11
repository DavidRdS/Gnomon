import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { randomBytes, createHash } from 'crypto';

const prisma = new PrismaClient();

// Interface para estender o objeto Request do Express e adicionar a propriedade 'user'
interface AuthRequest extends Request {
  user?: { userId: number };
}

// --- Schemas de Validação com Zod ---

const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").min(3, "O nome precisa ter no mínimo 3 caracteres."),
  email: z.string().min(1, "O e-mail é obrigatório.").email("Formato de e-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória.").min(6, "A senha precisa ter no mínimo 6 caracteres."),
});

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido.").min(1, "O e-mail é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido.").min(1, "O e-mail é obrigatório."),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido."),
  token: z.string().min(1, "Token é obrigatório."),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
});

// --- Funções do Controller ---

/**
 * @route POST /api/users/register
 * @description Registra um novo usuário no sistema.
 * @access Público
 */
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Erro de validação.', details: error.issues });
    }
    if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};


/**
 * @route POST /api/users/login
 * @description Autentica um usuário e retorna um token JWT.
 * @access Público
 */
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error("A chave secreta JWT_SECRET não está definida no arquivo .env");
      return res.status(500).json({ message: 'Erro de configuração interna do servidor.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Erro de validação.', details: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro interno no login.' });
  }
};

/**
 * @route POST /api/users/forgot-password
 * @description Envia um e-mail de recuperação de senha.
 * @access Público
 */
export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    // Resposta genérica para evitar enumeração de usuários
    if (!user) {
      return res.status(200).json({ message: "Se um usuário com este e-mail existir, um link de recuperação foi enviado." });
    }

    // Gera token e salva HASH + expiração no banco
    const resetToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: tokenHash,
        passwordResetExpires: expires
      }
    });

    // URL do frontend (ajuste caso seu path seja diferente)
    const baseUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
    const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(user.email)}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password do Gmail
      },
    });

    await transporter.sendMail({
      from: `"Seu App" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Recuperação de Senha',
      html: `
        <h1>Recuperação de Senha</h1>
        <p>Olá, ${user.name}!</p>
        <p>Clique no link para redefinir sua senha (expira em 30 minutos):</p>
        <a href="${resetLink}" target="_blank" style="padding: 10px 15px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      `,
    });

    return res.status(200).json({ message: "Se um usuário com este e-mail existir, um link de recuperação foi enviado." });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Erro de validação.', details: error.issues });
    }
    console.error("Erro ao enviar e-mail de recuperação:", error);
    return res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
};

/**
 * @route POST /api/users/reset-password
 * @description Redefine a senha do usuário após validar token.
 * @access Público
 */
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, token, password } = resetPasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }

    // Verifica expiração
    if (user.passwordResetExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: 'Token expirado.' });
    }

    // Confere o hash do token
    const tokenHash = createHash('sha256').update(token).digest('hex');
    if (tokenHash !== user.passwordResetToken) {
      return res.status(400).json({ message: 'Token inválido.' });
    }

    // Atualiza a senha e limpa os campos de reset
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });

    return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Erro de validação.', details: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
};

/**
 * @route GET /api/users/profile
 * @description Busca e retorna os dados do perfil do usuário autenticado.
 * @access Privado (requer token)
 */
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Não autorizado, ID do usuário não encontrado no token.' });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
