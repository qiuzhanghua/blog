# NestJS + TypeORM

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm start

# watch mode
NODE_ENV=deveploment pnpm start:dev

# production mode
pnpm start:prod
```

## Test

```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e

# test coverage
pnpm test:cov
```

## My dotenv
```dotenv
# DB_TYPE=postgres
# DB_PORT=5432
DB_TYPE=mysql
DB_PORT=3306
DB_HOST=127.0.0.1
DB_USERNAME=blog
DB_PASSWORD=blog
DB_NAME=blog
```
