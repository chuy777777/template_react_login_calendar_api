FROM node:20.16.0 as build
WORKDIR /app
COPY ./app/ .
RUN npm install 
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

