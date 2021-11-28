FROM node:14.17.0
WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=2048
COPY ./ /usr/src/app/
RUN yarn install

ENTRYPOINT ["yarn", "start"]