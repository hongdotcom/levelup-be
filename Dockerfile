FROM node:14
WORKDIR /Users/hongdotcom/Desktop/Sites/levelup-backend
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]
