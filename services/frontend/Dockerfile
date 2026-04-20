# Étape de développement
FROM node:24

# Créer un dossier de travail dans le conteneur
WORKDIR /app


# COPY . . # UNIQUEMENT PROD

COPY package.json package-lock.json* ./
RUN npm install

# Port de Vite
EXPOSE 3000

# Lancer Vite en mode dev
CMD ["npm", "run", "dev"]

# Pour le push final (prod)
# CMD ["npm", "run", "build"]