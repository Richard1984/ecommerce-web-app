FROM node:16-alpine as builder

# Build args
ARG SERVER_API_URL

# Environment vars
ENV REACT_APP_SERVER_API_URL=$SERVER_API_URL

WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer

COPY . .
RUN npm run build

FROM nginx:latest
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=builder /app/build /usr/share/nginx/html

ENV PORT=80
EXPOSE 80

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'