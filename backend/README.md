# order-management-api

Provides api for the order management system

## Developed by

[Asif Jalil](https://www.linkedin.com/in/asifjalil0)

## Technologies

- NodeJS
- Typescript
- NestJS (node js framework)
- MySQL
- Prisma

## Run locally

Clone the project

```bash
  git clone git@github.com:asif-jalil/order-management.git
```

Go to folder directory

```bash
  cd order-management/backend
```

Open development env and update with your credential

```bash
  sudo nano configs/.env.development
```

Install dependencies

```bash
  npm install
```

Run migration

```bash
  npm run migrate:dev
```

Generate prisma instances

```bash
  npm run prisma:generate
```

Run seeder

```bash
  npm run seed:run
```

Start the server

```bash
  npm run start:dev
```

## How to

- Build for production : `npm run build`
- Run on production : `npm run start:prod`
