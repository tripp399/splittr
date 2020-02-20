FROM splittr_ubuntu
MAINTAINER Pulkit Tripathi <p.tripathi@ufl.edu>

WORKDIR /scripts
COPY scripts/ /scripts/

WORKDIR /front

COPY build-scripts /front/build-scripts

#RUN sudo /root/build-scripts/install-nginx

RUN /root/build-scripts/install-nodejs-npm

COPY . .

RUN chmod +x ./utils/build-frontend

RUN ./utils/build-frontend

CMD ["bash", "/front/start.sh"]

# FROM node:12.2.0

# WORKDIR /app

# COPY . .

# RUN npm install
# RUN npm run build

# FROM nginx:latest
# COPY --from=node /app/dist/frontend /usr/share/nginx/html
