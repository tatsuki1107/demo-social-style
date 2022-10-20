FROM node:14.13.1

WORKDIR /home/app/frontend/

COPY ./init.sh /home/app/frontend
COPY ./package.json /home/app/frontend
RUN chmod +x init.sh && ./init.sh

EXPOSE 3000
CMD ["npm", "start"]
