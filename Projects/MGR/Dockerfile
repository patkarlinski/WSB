# Użyj oficjalnego obrazu Node.js
FROM node:18

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności projektu
RUN npm install

# Skopiuj pozostałe pliki aplikacji do katalogu roboczego
COPY . .

# Eksponuj port, na którym działa aplikacja (np. 3000)
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]

