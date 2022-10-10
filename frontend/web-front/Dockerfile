FROM node:14.13.1

WORKDIR /home/app/frontend/
COPY . ./

RUN npm install && npm upgrade --no-progress --network-timeout 1000000
RUN npm i @fortawesome/react-fontawesome && npm i @fortawesome/fontawesome-svg-core
RUN npm i react-router-dom
RUN npm install styled-components



EXPOSE 3000
CMD ["npm", "start"]
