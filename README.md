# Teste_pratico

Bem vindo ao Cinelist!

![image](https://github.com/user-attachments/assets/f8d7b762-6fc7-4f89-9638-ce48a81b5725)

# Tecnologias utilizadas

- Front: React com Typescript
- Back: Node com Typescript
- Banco de dados: PostGresSql (hospedado no supabase)

# Como rodar

1. Pegue sua API key do [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)
2. Crie uma organização no [supabase](https://supabase.com) e crie um projeto dentro dessa organização.
3. Espere o projeto ser iniciado, após isso na tela inicial clicke em connect, vá em APP Frameworks e selecione React, nessa tela pegue os dados do REACT_APP_SUPABASE_URL E REACT_APP_SUPABASE_ANON_KEY.

4. vá no SQL editor no supabase do seu projeto e rode os seguintes comandos:

   ```
   create table
   public.users (
       id uuid not null default extensions.uuid_generate_v4 (),
       email text not null,
       created_at timestamp with time zone not null default timezone ('utc'::text, now()),
       password text not null,
       username text not null,
       constraint users_pkey primary key (id),
       constraint users_email_key unique (email),
       constraint users_username_key unique (username)
   ) tablespace pg_default;

   create table
   public.favorites (
   id serial not null,
   user_id uuid null,
   movie_id integer not null,
   title text not null,
   poster_path text null,
   constraint favorites_pkey primary key (id),
   constraint favorites_user_id_fkey foreign key (user_id) references users (id) on delete cascade
   ) tablespace pg_default;

   create table
   public.shared_favorites (
       id uuid not null default extensions.uuid_generate_v4 (),
       user_id uuid not null,
       email text null,
       movie_ids text[] null,
       created_at timestamp without time zone null default now(),
       updated_at timestamp with time zone null default now(),
       username text not null,
       constraint shared_favorites_pkey primary key (id),
       constraint shared_favorites_user_id_fkey foreign key (user_id) references users (id)
   ) tablespace pg_default;

   CREATE OR REPLACE FUNCTION update_timestamp()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = now();
       RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER update_shared_favorites_timestamp
   BEFORE UPDATE ON shared_favorites
   FOR EACH ROW
   EXECUTE FUNCTION update_timestamp();

   ```

5. crie uma JWT_SECRET, seguindo o passo a passo:
6. Abra o terminal.
7. Execute o seguinte comando para gerar uma string aleatória de 32 caracteres:

   ```sh
   openssl rand -base64 32
   ```

8. Copie a string gerada.
9. Abra o arquivo `.env` e defina a variável `JWT_SECRET` com a string gerada. Por exemplo:

   ```properties
   JWT_SECRET=qwertyuiopasdfghjklzxcvbnm123456
   ```

   Substitua `qwertyuiopasdfghjklzxcvbnm123456` pela string gerada no passo 6.

10. crie o .env do backend no caminho `/server`, como exatamente como o abaixo:

    ```.env
    TMDB_API_KEY=SUA TMDB_API_KEY
    SUPABASE_URL=SUA REACT_APP_SUPABASE_URL
    SUPABASE_KEY=SUA REACT_APP_SUPABASE_ANON_KEY
    JWT_SECRET=SUA JWT_SECRET
    PORT=5000 // não mexa nessa linha
    ```

11. crie o .env do frontend no caminho `/client`, como o abaixo:

    ```.env
    REACT_APP_API_BASE_URL='http://localhost:5000'
    ```

12. Tenha o [node](https://nodejs.org/pt) 22 instalado ou o LTS

13. Rode nas pastas `/client` e `/server` o comando:

    ```
    npm install
    ```

14. Rode na pasta `/client` Espere até concluir e navegue até o locahost:port apresentado pelo terminal (normalmente port:4000):

    ```
    npm run start
    ```

15. Rode na pasta `/server`:
    ```
    npm run dev
    ```
