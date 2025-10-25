FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production --silent
COPY src ./src
EXPOSE 4000
CMD ["node","src/main.js"]
