#Build Stage Start

#Specify a base image
FROM node as builder 

#Specify a working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies


RUN yarn
#Copy remaining files
COPY . .

#Build the project for production
RUN yarn build

#Run Stage Start
FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
#Copy production build files from builder phase to nginx
COPY --from=builder /app/build /usr/share/nginx/html