FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --omit=dev
USER node
CMD [ "node", "./index.js" ]
