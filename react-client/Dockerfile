FROM    node:18

WORKDIR code

COPY    . .

RUN npm install

RUN   npm run build

EXPOSE 3000

CMD ["yarn", "start"]