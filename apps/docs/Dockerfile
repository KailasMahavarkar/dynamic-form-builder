FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-storybook

FROM nginx:alpine

# Copy the Storybook static files from the build stage
COPY --from=0 /usr/src/app/storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]