# STEP 1 build static website
#FROM node:alpine as builder
#RUN apk update && apk add --no-cache make git
# Create app directory

#WORKDIR /app

# Install app dependencies
#COPY package.json package-lock.json Makefile  /app/

#COPY ../loghub-front/dist/loghub-front /app/

#RUN cd /app && npm set progress=false && npm install
# Copy project files into the docker image
#RUN cd /home/gene/Projects/logging-hub/loghub-front/dist/loghub-front
#RUN cd ../loghub-front/dist/loghub-front
#COPY .  /app
#RUN cd /app && npm run build

# STEP 2 build a small nginx image with static website

FROM nginx:alpine
#RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/ .

## Remove default nginx website


## From 'builder' copy website to default nginx public folder

#COPY --from=builder /app/dist /usr/share/nginx/html

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
