# Desarrollador

[Javier Toussent Fis](javiertoussentfis@gmail.com)

# Ofertas App

[GitHub](https://github.com/JavierTF/bonos-vip)

Aplicación web de gestión de ofertas y servicios desarrollada con Next.js.

## Estructura del Proyecto

```
src/
├── app/              # Rutas y páginas 
│   ├── (auth)/       # Autenticación
│   ├── admin/        # Panel administrativo
│   ├── api/          # API endpoints
│   └── offers/       # Páginas de ofertas
├── components/       # Componentes React
├── hooks/            # Custom hooks
├── lib/              # Utilidades y configuración
├── models/           # Modelos de datos
└── types/            # TypeScript types
```

## Características

- CRUD de ofertas
- Panel administrativo
- Registro de usuarios
- Autenticación de usuarios
- Upload múltiple de imágenes
- [Filtros y búsqueda](Pendiente)

## Tech Stack

- Next.js + TypeScript
- Sequelize + PostgreSQL
- Tailwind CSS + Shadcn UI
- bcrypt

## Instalación y Configuración

### Pre-requisitos

- Node.js 18 o superior
- PostgreSQL
- Git

### Pasos

1. Clonar el repositorio
```bash
git clone https://github.com/JavierTF/bonos-vip.git
cd bonos-vip
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
# Edita .env con tus credenciales
```

4. Crear base de datos y ejecutar migraciones
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all (poblar base de datos con algunos ejemplos)
```

5. Iniciar servidor de desarrollo
```bash
npm run dev
```

## Ejemplo de Variables de Entorno (puede usar uno u otro)

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/bonos_db
NEXTAUTH_SECRET=dCOvVq6nIlrAMdVQCihPRWI5j89rDeZvYlQYY2cJszo=
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bonos_db
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

## API Endpoints

```
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/offers
POST   /api/offers
PUT    /api/offers/[id]
DELETE /api/offers/[id]/delete
POST   /api/upload
```