FROM node:16-alpine as builder

# Build args
ARG SERVER_API_URL
ARG STRIPE_PUB_KEY

# Environment vars
ENV SERVER_API_URL=$SERVER_API_URL
ENV REACT_APP_STRIPE_PUB_KEY=$STRIPE_PUB_KEY

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

CMD /bin/bash -c "envsubst '\$PORT \$SERVER_API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'