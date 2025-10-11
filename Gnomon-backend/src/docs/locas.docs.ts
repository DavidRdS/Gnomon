/**
 * @openapi
 * /api/locais:
 *   get:
 *     tags: [Locais]
 *     summary: Lista todos os locais
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Local' }
 *   post:
 *     tags: [Locais]
 *     summary: Cria um local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LocalCreate' }
 *     responses:
 *       201:
 *         description: Criado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Local' }
 *
 * /api/locais/{id}:
 *   get:
 *     tags: [Locais]
 *     summary: Obtém um local por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Local' }
 *       404:
 *         description: Não encontrado
 *   put:
 *     tags: [Locais]
 *     summary: Atualiza um local por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LocalUpdate' }
 *     responses:
 *       200:
 *         description: Atualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Local' }
 *       404:
 *         description: Não encontrado
 *   delete:
 *     tags: [Locais]
 *     summary: Remove um local por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Removido
 */
export {};