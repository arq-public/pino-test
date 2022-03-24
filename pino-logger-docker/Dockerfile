FROM registry.access.redhat.com/ubi8/nodejs-12:1-59
USER root
RUN useradd --uid 1000 --gid 0 --shell /bin/bash --create-home node 
RUN npm -v
WORKDIR pino-logger-docker
ADD ./dist /project/dist
ADD ./project /project
RUN chown -hR root:0 /project
RUN chown -hR node:0 /project \
    && chmod -R g=u /project
WORKDIR /project
RUN npm install --unsafe-perm --production
WORKDIR /project
ENV NODE_PATH=/project/dist/node_modules
ENV NODE_ENV development
ENV PORT 4000
USER node
EXPOSE 4000
CMD ["npm","start"]