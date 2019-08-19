FROM node:9.6.1

LABEL version="1.0"
LABEL description="Twiker"
LABEL maintainer="Santiago Ortiz Cano - sortizc1@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install
RUN npm install glob
RUN npm install --test

EXPOSE 3000

CMD sudo mongod
CMD npm run webpack
CMD npm run dev