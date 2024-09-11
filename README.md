# Teste_pratico

Bem vindo ao Cinelist!

# Tecnologias utilizadas

- Front: React com Typescript
- Back: Node com Typescript e express, e Prisma como ORM
- Banco de dados: PostGresSql.

# Como rodar (AINDA EM PRODUÇÃO)

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

7. crie o .env do backend no caminho `/server`, exatamente como o abaixo:

   ```.env
   TMDB_API_KEY=SUA TMDB_API_KEY
   DATABASE_URL="postgresql://postgres:postgres@postgres:5432/testdb?schema=public" // Essa linha é necessária para o docker
   JWT_SECRET=SUA JWT_SECRET
   PORT=5000 // não mexa nessa linha
   ```

8. crie o .env do frontend no caminho `/client`, como o abaixo:

   ```.env
   REACT_APP_API_BASE_URL='http://localhost:5000'
   ```

9. Tenha o [node](https://nodejs.org/pt) 22 instalado ou o LTS

10. Rode na pasta `/ambiente`, para buildar os contêineres Docker.:

    ```
    docker-compose up --build -d
    ```

11. Após o build, suba os contêineres:

    ```
    docker-compose up
    ```

12. Acesse a aplicação no link `http://localhost:3000`
