/**
 * @file localController.ts
 * @description Controller para gerenciar as operações CRUD do recurso 'Local'.
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Instancia o cliente do Prisma para interagir com o banco de dados.
const prisma = new PrismaClient();


// --- Schemas de Validação (Zod) ---

// Schema para validar os dados na criação de um novo local.
const localSchema = z.object({
  name: z.string().min(1, "O nome do local é obrigatório."),
  description: z.string().optional(),
  coordinates: z.string().min(1, "As coordenadas são obrigatórias."),
  type: z.string().min(1, "O tipo do local é obrigatório."),
  iconUrl: z.string().url("URL do ícone inválida.").optional(),
  mapId: z.number().int("O ID do mapa deve ser um número inteiro."),
});


// --- Funções do Controller ---

/**
 * @route GET /api/locais
 * @description Busca e retorna uma lista de todos os locais cadastrados.
 * @access Público
 */
export const getAllLocais = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Usa o Prisma para buscar todos os registros da tabela 'Local'.
    const locais = await prisma.local.findMany({
      // Opcional: inclui os dados do mapa relacionado a cada local.
      include: { map: true },
    });
    return res.status(200).json(locais);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar os locais.' });
  }
};


/**
 * @route GET /api/locais/:id
 * @description Busca e retorna um local específico pelo seu ID.
 * @access Público
 */
export const getLocalById = async (req: Request, res: Response): Promise<Response> => {
    // O ID é pego dos parâmetros da URL (ex: /api/locais/1).
    const { id } = req.params;
    try {
        // Usa o Prisma para buscar um registro único onde o ID corresponde.
        const local = await prisma.local.findUnique({
            where: { id: Number(id) }, // Converte o ID de string para número.
            include: { map: true },
        });

        // Se nenhum local for encontrado com esse ID, retorna um erro 404.
        if (!local) {
            return res.status(404).json({ message: 'Local não encontrado.' });
        }
        
        // Se encontrar, retorna o local com status 200.
        return res.status(200).json(local);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocorreu um erro ao buscar o local.' });
    }
}


/**
 * @route POST /api/locais
 * @description Cria um novo local no banco de dados.
 * @access Privado (futuramente, apenas para administradores)
 */
export const createLocal = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Valida o corpo da requisição (os dados enviados) com o schema do Zod.
    const data = localSchema.parse(req.body);

    // Usa o Prisma para criar um novo registro na tabela 'Local'.
    const newLocal = await prisma.local.create({
      data: data,
    });

    // Retorna o novo local criado com um status 201 (Created).
    return res.status(201).json(newLocal);

  } catch (error) {
    // Se a validação do Zod falhar, retorna um erro 400 (Bad Request).
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos.', details: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao criar o local.' });
  }
};

// Futuramente, você pode adicionar aqui as funções updateLocal e deleteLocal.