FROM splittr_ubuntu
MAINTAINER Pulkit Tripathi <p.tripathi@ufl.edu>

#RUN sudo /root/build-scripts/install-nginx

RUN /root/build-scripts/install-nodejs-npm

COPY . .

RUN chmod +x ./utils/build-frontend

RUN ./utils/build-frontend

CMD ["bash", "start.sh"]
