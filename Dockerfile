FROM node:17-alpine

RUN mkdir -p /home/node/movies/node_modules && chown -R node:node /home/node/movies

WORKDIR /home/node/movies

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build && npm prune -- production

COPY --chown=node:node dist /home/node/movies

EXPOSE 5173

CMD ["npm", "run", "dev"] 
