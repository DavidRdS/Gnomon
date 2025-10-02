/**
 * @file userRoutes.ts
 * @description Rotas da API relacionadas a usuários:
 * registro, login, recuperação de senha, redefinição de senha e perfil.
 */

import { Router } from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
} from '../controllers/UserController'; // atenção ao case do arquivo (U e C maiúsculos)
import { protect } from '../middleware/authMiddleware';

const router = Router();

// --- ROTAS PÚBLICAS ---

/**
 * @route   POST /api/users/register
 * @desc    Registra um novo usuário.
 * @access  Público
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Autentica um usuário e retorna um token JWT.
 * @access  Público
 */
router.post('/login', loginUser);

/**
 * @route   POST /api/users/forgot-password
 * @desc    Solicita um e-mail com link de recuperação de senha.
 * @access  Público
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   POST /api/users/reset-password
 * @desc    Redefine a senha com token (validação no controller).
 * @access  Público
 */
router.post('/reset-password', resetPassword);

// --- ROTAS PRIVADAS ---

/**
 * @route   GET /api/users/profile
 * @desc    Retorna o perfil do usuário autenticado.
 * @access  Privado (requer token)
 */
router.get('/profile', protect, getUserProfile);

export default router;