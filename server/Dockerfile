# Fetching the minified node image on apline linux
FROM node:slim

# Installing openssl
RUN apt-get update -y && apt-get install -y openssl

# Declaring env
COPY .env .env

# Setting up the work directory
WORKDIR /backend

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all the rest of the files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Command is now provided in docker-compose
EXPOSE 5000
