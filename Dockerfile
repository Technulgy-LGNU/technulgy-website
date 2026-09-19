# build stage
FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_TAS_BASE_URL=https://tas.technulgy.com
ENV VITE_TAS_BASE_URL=$VITE_TAS_BASE_URL
RUN npm run build


# production stage
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]