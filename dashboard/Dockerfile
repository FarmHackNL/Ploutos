FROM node:lts-gallium as build-stage
WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app/ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /etc/nginx/entrypoint.sh
RUN chmod 0777 /etc/nginx/entrypoint.sh
RUN chmod +x /etc/nginx/entrypoint.sh
ENTRYPOINT ["/etc/nginx/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]