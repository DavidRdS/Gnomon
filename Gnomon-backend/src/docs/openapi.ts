/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: Health check da API
 *   - name: Users
 *     description: Autenticação e gerenciamento de usuários
 *   - name: Locais
 *     description: Endpoints de locais
 *   - name: Mapas
 *     description: Endpoints de mapas
 *   - name: Rotas
 *     description: Endpoints de rotas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         email: { type: string, format: email }
 *         name: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     UserPublic:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *
 *     RegisterRequest:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name: { type: string, example: "Fulano" }
 *         email: { type: string, format: email, example: "fulano@teste.com" }
 *         password: { type: string, format: password, example: "123456" }
 *
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email: { type: string, format: email }
 *         password: { type: string, format: password }
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token: { type: string }
 *         user:
 *           $ref: '#/components/schemas/UserPublic'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message: { type: string }
 *
 *     Map:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         imageUrl: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     MapCreate:
 *       type: object
 *       required: [name, imageUrl]
 *       properties:
 *         name: { type: string }
 *         imageUrl: { type: string }
 *
 *     MapUpdate:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         imageUrl: { type: string }
 *
 *     Local:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         description: { type: string, nullable: true }
 *         coordinates: { type: string, example: "-8.3027, -35.9912" }
 *         type: { type: string, example: "Sala de Aula" }
 *         iconUrl: { type: string, nullable: true }
 *         mapId: { type: integer }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     LocalCreate:
 *       type: object
 *       required: [name, coordinates, type, mapId]
 *       properties:
 *         name: { type: string }
 *         description: { type: string }
 *         coordinates: { type: string }
 *         type: { type: string }
 *         iconUrl: { type: string }
 *         mapId: { type: integer }
 *
 *     LocalUpdate:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         description: { type: string }
 *         coordinates: { type: string }
 *         type: { type: string }
 *         iconUrl: { type: string }
 *         mapId: { type: integer }
 *
 *     Route:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         pathData: { type: string, example: "[[-8.302,-35.991],[-8.303,-35.992]]" }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     RouteCreate:
 *       type: object
 *       required: [name, pathData]
 *       properties:
 *         name: { type: string }
 *         pathData: { type: string }
 *
 *     RouteUpdate:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         pathData: { type: string }
 */
export {};