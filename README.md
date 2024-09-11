# Teste_pratico

Bem vindo ao Cinelist!

# Tecnologias utilizadas

- Front: React com Typescript
- Back: Node com Typescript e express, e Prisma como ORM
- Banco de dados: PostGresSql.

# Como rodar

1. Pegue sua API key do [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)
2. crie uma JWT_SECRET, seguindo o passo a passo:
3. Abra o terminal.
4. Execute o seguinte comando para gerar uma string aleatória de 32 caracteres:

   ```sh
   openssl rand -base64 32
   ```

5. Copie a string gerada.
6. Abra o arquivo `.env` e defina a variável `JWT_SECRET` com a string gerada. Por exemplo:

   ```properties
   JWT_SECRET=qwertyuiopasdfghjklzxcvbnm123456
   ```

   Substitua `qwertyuiopasdfghjklzxcvbnm123456` pela string gerada no passo 4.

7. Altere o `docker-compose.yml` dentro da pasta `/ambiente`, altere a partir do `environment`:

   ```
     backend:
    build:
      context: ../server
      dockerfile: Dockerfile
    container_name: backend
    ports:
      - "5000:5000"
    environment: a partir daqui
      - PORT=5000
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/testdb?schema=public
      - TMDB_API_KEY = SUA_TMDB_API_KEY
      - JWT_SECRET = SUA_JWT_SECRET
    depends_on:
      postgres:
        condition: service_healthy
    command: sh -c "npx prisma migrate dev --name init && npm run dev"
   ```

8. crie o .env do frontend no caminho `/client`, como o abaixo:

   ```.env
   REACT_APP_API_BASE_URL='http://localhost:5000'
   ```

9. Rode na pasta `/ambiente`, para buildar os contêineres Docker.:

   ```
   docker-compose up --build -d
   ```

10. Acesse a aplicação no link `http://localhost:3000`
