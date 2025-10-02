/**
 * @file localRoutes.ts
 * @description Este arquivo define as rotas da API para o recurso 'Local',
 * como buscar todos os locais, buscar um por ID e criar um novo local.
 */

import { Router } from 'express';

// Importa as funções de lógica do controller correspondente.
import {
  getAllLocais,
  getLocalById,
  createLocal,
  // Futuramente, importaremos aqui as funções de update e delete.
} from '../controllers/LocalController';

// Cria uma nova instância de roteador do Express.
const router = Router();


// --- DEFINIÇÃO DAS ROTAS PARA /api/locais ---

/**
 * @route   GET /api/locais
 * @desc    Rota para listar todos os locais cadastrados.
 * @access  Público
 */
router.get('/', getAllLocais);

/**
 * @route   GET /api/locais/:id
 * @desc    Rota para buscar um local específico pelo seu ID.
 * @access  Público
 */
router.get('/:id', getLocalById);

/**
 * @route   POST /api/locais
 * @desc    Rota para criar um novo local.
 * @access  Privado (futuramente, apenas para administradores)
 */
router.post('/', createLocal);


/*
 * ROTAS FUTURAS PARA ATUALIZAR E DELETAR (CRUD Completo)
 *
 * router.put('/:id', updateLocal);    // Rota para atualizar um local existente.
 * router.delete('/:id', deleteLocal); // Rota para deletar um local.
 */


// Exporta o roteador para ser usado no arquivo server.ts.
export default router;