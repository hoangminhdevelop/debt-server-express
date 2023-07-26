FROM --platform=linux/amd64 node:18

WORKDIR /usr/app

ADD package.json ./

RUN yarn install

RUN yarn global add pm2

COPY . .

RUN yarn build

EXPOSE 8080

# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD ["pm2-runtime", "dist/index.js"]
