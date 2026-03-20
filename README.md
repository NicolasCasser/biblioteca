# 📚 Biblioteca API

<p align="center">
  <strong>API de Gerenciamento de Biblioteca com Sistema de Aluguel de Livros</strong><br/>
  Desenvolvida com NestJS, TypeScript e PostgreSQL
</p>

---

## 📋 Sobre o Projeto

A **Biblioteca API** é uma aplicação backend para gerenciamento de uma biblioteca digital. O sistema oferece funcionalidades completas de CRUD para livros e usuários, além de um sistema de aluguel com controle de estado e autorização baseada em papéis.

### ✨ Principais Características

- **Autenticação com JWT** - Segurança com tokens Bearer
- **Controle de Acesso Baseado em Papéis** - Usuários com papéis Admin e Client
- **Gerenciamento de Livros** - CRUD completo com validações
- **Gerenciamento de Usuários** - Cadastro, atualização e autenticação
- **Sistema de Aluguel** - Workflow de reserva, retirada e devolução
- **Job Agendado** - Cancelamento automático de reservas expiradas (Cron)
- **Documentação Interativa** - Swagger/OpenAPI integrado
- **Validação de Dados** - Validação com class-validator
- **Migrations de Banco de Dados** - TypeORM com suporte a versionamento
- **Containerização** - Docker e Docker Compose

---

## 🛠️ Stack Tecnológico

| Tecnologia            | Propósito                 |
| --------------------- | ------------------------- |
| **NestJS**            | Framework backend         |
| **TypeScript**        | Linguagem tipada          |
| **PostgreSQL**        | Banco de dados relacional |
| **TypeORM**           | ORM e migrations          |
| **JWT**               | Autenticação              |
| **Swagger**           | Documentação API          |
| **class-validator**   | Validação de dados        |
| **class-transformer** | Transformação de objetos  |
| **bcrypt**            | Hash de senhas            |
| **@nestjs/schedule**  | Jobs agendados            |

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Yarn ou npm

### Instalação

```bash
# Clone o repositório
git clone <repositorio-url>
cd biblioteca

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie os serviços
docker-compose up -d

# Execute as migrations
docker-compose exec api yarn migration:run

# A API estará disponível em http://localhost:3000
```

### Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
# Banco de Dados
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=biblioteca

# JWT
JWT_SECRET=sua-chave-secreta-minimo-32-caracteres

# Porta da API
API_PORT=3000
```

---

## 📚 Estrutura do Projeto

```
src/
├── common/                 # Funcionalidades compartilhadas
│   ├── decorators/         # @Roles(), @CurrentUser()
│   └── interfaces/         # AuthUser interface
├── config/                 # Configurações (PostgreSQL, etc)
├── database/               # Configuração TypeORM e migrations
│   └── migrations/         # Scripts de versionamento BD
├── modules/                # Módulos da aplicação
│   ├── auth/              # Autenticação JWT
│   ├── books/             # Gerenciamento de livros
│   ├── user/              # Gerenciamento de usuários
│   ├── rentals/           # Sistema de aluguel
│   └── bases/             # Classes base (DTOs e Entities)
├── app.module.ts          # Módulo raiz
└── main.ts                # Entry point
```

---

## 🔌 Endpoints Principais

### Autenticação

```
POST   /auth/login          # Login e obter token JWT
```

### Livros

```
GET    /books              # Listar todos os livros
POST   /books              # Criar livro (Admin)
GET    /books/:id          # Obter livro por ID
PATCH  /books/:id          # Atualizar livro (Admin)
DELETE /books/:id          # Deletar livro (Admin)
```

### Usuários

```
POST   /user               # Criar novo usuário
GET    /user/:id           # Obter usuário
PATCH  /user/:id           # Atualizar usuário
```

### Aluguéis

```
POST   /rentals            # Criar reserva de livro
GET    /rentals            # Listar aluguéis (Admin)
GET    /rentals/my         # Obter meus aluguéis
GET    /rentals/:id        # Obter aluguel por ID
PATCH  /rentals/:id/pickup # Confirmar retirada (Admin)
PATCH  /rentals/:id/return # Confirmar devolução (Admin)
```

### Documentação Interativa

```
GET    /api/docs           # Swagger/OpenAPI UI
```

---

## 🔐 Modelos de Usuário

### Admin

- Criar, atualizar e deletar livros
- Gerenciar todas as reservas
- Confirmar retiradas e devoluções

### Client

- Visualizar livros disponíveis
- Reservar livros
- Visualizar apenas seus aluguéis

---

## 📋 Sistema de Aluguel

### Workflow de Estados

1. **RESERVED** - Livro reservado, aguardando retirada
   - Prazo padrão: 3 dias
   - Pode ser cancelado automaticamente se expirar

2. **BORROWED** - Livro retirado pelo usuário
   - Prazo padrão: 30 dias
   - Deve ser devolvido neste período

3. **RETURNED** - Livro devolvido
   - Estado final do aluguel

4. **CANCELLED** - Reserva cancelada
   - Por expiração do prazo ou cancelamento manual

### Job Agendado (Cron)

Um job automático é executado a cada hora para:

- Verificar reservas com prazo de retirada expirado
- Cancelar automaticamente reservas expiradas
- Liberar o livro para novas reservas

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
yarn start              # Iniciar servidor
yarn start:dev        # Modo desenvolvimento com auto-reload
yarn start:debug      # Modo debug
yarn start:prod       # Produção

# Build
yarn build            # Compilar TypeScript

# Qualidade de Código
yarn lint             # Executar ESLint e corrigir
yarn format           # Formatar código com Prettier

# Banco de Dados
yarn migration:generate [name]  # Gerar nova migration
yarn migration:run              # Executar migrations
yarn migration:revert           # Reverter última migration

# Testes
yarn test             # Executar testes
yarn test:watch       # Modo watch
yarn test:cov         # Com cobertura
yarn test:e2e         # E2E
```

---

## 🗄️ Banco de Dados

### Entidades

#### Users

- `id` (UUID, PK)
- `name` (VARCHAR)
- `email` (VARCHAR, Único)
- `password` (VARCHAR, Hasheado)
- `role` (ENUM: admin, client)
- `created_at`, `updated_at`, `deleted_at` (Soft Delete)

#### Books

- `id` (UUID, PK)
- `title` (VARCHAR)
- `author` (VARCHAR)
- `genre` (VARCHAR)
- `created_at`, `updated_at`, `deleted_at` (Soft Delete)

#### Rentals

- `id` (UUID, PK)
- `user_id` (UUID, FK)
- `book_id` (UUID, FK)
- `reserved_at` (TIMESTAMP)
- `pickup_deadline` (TIMESTAMP)
- `picked_up_at` (TIMESTAMP)
- `due_date` (TIMESTAMP)
- `returned_at` (TIMESTAMP)
- `status` (ENUM: reserved, borrowed, returned, cancelled)
- `created_at`, `updated_at`, `deleted_at` (Soft Delete)

---

## 🐳 Docker

### Compose Services

```yaml
# API NestJS
api:
  - Porta: 3000
  - Modo: Watch (auto-reload)

# PostgreSQL
postgres:
  - Versão: 17
  - Porta: 5432
  - Volume: api_db_data
```

### Comandos Docker

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar serviços
docker-compose down

# Remover volumes (dados)
docker-compose down -v
```

---

## 🔒 Segurança

- ✅ Senhas com hash bcrypt (10 rounds)
- ✅ Autenticação JWT com Bearer tokens
- ✅ Validação de entrada automática
- ✅ Controle de acesso baseado em papéis 
- ✅ Soft delete em todas as entidades
- ✅ Exclusão de senha nas respostas da API
- ✅ CORS configurável

---

## 📝 Exemplos de Uso

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "senha123"
  }'
```

Resposta:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Criar Livro (Admin)

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "title": "Clean Code",
    "author": "Robert Martin",
    "genre": "Programming"
  }'
```

### Criar Reserva de Livro

```bash
curl -X POST http://localhost:3000/rentals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "userId": "uuid-do-usuario",
    "bookId": "uuid-do-livro"
  }'
```

---

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

- Verifique se PostgreSQL está rodando
- Confirme as credenciais em `.env`
- Execute `docker-compose up -d postgres`

### Erro de migrations

```bash
# Resetar banco de dados
docker-compose down -v
docker-compose up -d
yarn migration:run
```

### Porta já em uso

```bash
# Mudar porta em docker-compose.yml ou .env
# Ou parar o processo usando a porta 3000
```

---

## 📚 Referências

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

---

## 👨‍💻 Autor

Desenvolvido por Nicolas  
Data: Março de 2026