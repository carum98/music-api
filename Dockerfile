FROM node:18.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["npm", "run", "serve"]
