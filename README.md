# prova-dev-fattor

Aplicação web para upload, processamento e consulta de status de arquivos **CNAB 444**.

---

## Funcionalidades

- Autenticação via API Fattor (email + senha).
- Upload e parsing de arquivos CNAB 444 (`.txt` / `.rem`).
- Validação do arquivo: header, detalhe e trailer.
- Tabela com os registros extraídos e consulta de status por linha via API.
- Consulta em lote.
- Interface responsiva e acessível.

---

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- PostgreSQL acessível (local ou remoto)
- Conta com acesso à API Fattor

### 1. Clone e instale as dependências

```bash
git clone https://github.com/<seu-usuario>/prova-dev-fattor
cd prova-dev-fattor
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
# URL pública da aplicação
BETTER_AUTH_URL=http://localhost:3000

# String de conexão com o banco de dados PostgreSQL
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_db
;
# URL base da API do Fattor
FATTOR_STATUS_BASE_URL=https://symphony.fattorcredito.com.br/public/prova-dev
```

### 3. Execute as migrations do banco

```bash
npx prisma migrate deploy
```

### 4. Gere o Prisma Client

```bash
npx prisma generate
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000).

---

## Documentação

- [Conteúdo e instruções da prova](./_prova/README.md)
- [Documentação do CNAB 444](./docs/README.md) — layout, tipos de registro e campos extraídos

---

## Stack

- **Next.js 16** (App Router)
- **Better Auth** — autenticação server-side com plugin custom
- **Prisma** + **PostgreSQL** — sessões e usuários
- **TanStack Table** — tabela com filtro, ordenação e paginação
- **Tailwind CSS** + **Biome** — estilo e qualidade de código
