# Prysla — Galería de Arte

Plataforma web para la Galería de Arte Prysla. Catálogo digital de obras, perfiles de artistas, dashboard de administración y gestión de contenidos.

## Frontend

Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4.

```bash
pnpm dev        # Iniciar servidor de desarrollo
pnpm build      # Build de producción
pnpm start      # Iniciar servidor de producción
pnpm lint       # Ejecutar ESLint
```

## Backend

API REST con Express, Prisma ORM, MySQL y autenticación JWT.

```bash
pnpm dev                # Iniciar servidor de desarrollo (:4000)
pnpm build              # Compilar TypeScript
pnpm prisma:push        # Sincronizar schema con la BD
pnpm prisma:migrate     # Ejecutar migraciones
pnpm prisma:seed        # Poblar base de datos
pnpm prisma:studio      # Abrir Prisma Studio
```

### Documentación Swagger

Los endpoints de la API están documentados con Swagger/OpenAPI 3.0:

- **Swagger UI:** `http://localhost:4000/api/docs`
- **OpenAPI JSON:** `http://localhost:4000/api/docs.json`

18 endpoints documentados con schemas de request/response y autenticación JWT incorporada.

### Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/artists/register` | Registro de artista |
| POST | `/api/auth/artists/login` | Inicio de sesión artista |
| POST | `/api/auth/admin/login` | Inicio de sesión admin |
| GET | `/api/artists` | Listar artistas |
| GET | `/api/artists/:id` | Obtener artista + obras |
| PATCH | `/api/artists/:id` | Actualizar perfil |
| GET | `/api/artworks` | Listar obras (filtros: status, artist_id) |
| GET | `/api/artworks/:id` | Obtener obra |
| POST | `/api/artworks` | Crear obra |
| POST | `/api/reviews/artworks/:id/approve` | Aprobar/rechazar obra |
| GET | `/api/dashboard/stats` | Estadísticas del dashboard |
| POST | `/api/newsletter/subscribe` | Suscripción newsletter |

## Stack completo

| Herramienta | Versión |
|---|---|
| Next.js | 16 |
| React | 19 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| Express | 4 |
| Prisma | 6 |
| MySQL | 8 |
| Package manager | pnpm |

## Estructura del monorepo

```
prysla/
├── Galeria-Prysla-/    # Frontend (Next.js)
│   ├── app/            # App Router pages
│   ├── components/     # Componentes React
│   ├── lib/            # Utilidades y configuración
│   └── types/          # Tipos TypeScript
│
└── backend/            # Backend (Express + Prisma)
    ├── src/
    │   ├── controllers/  # Controladores Express
    │   ├── routes/       # Rutas con documentación Swagger
    │   ├── middlewares/   # Auth middleware
    │   └── lib/          # Prisma, JWT, Cloudinary
    └── prisma/
        └── schema.prisma # Modelos de datos
```
