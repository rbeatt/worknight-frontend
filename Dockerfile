# Node base image
FROM node:14 as build

#Working directory, copies code to Docker image
WORKDIR /as-team1-ui

# Copy package.json and package.lock for docker cache
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

#  Build the app
RUN npm run build

# Serve using node server
FROM node:14

WORKDIR /as-team1-ui

COPY --from=build /as-team1-ui/ /as-team1-ui

# Swagger URL connection args and env variables
ARG API_URL
ENV API_URL ${API_URL}

#Listens to port 3000
EXPOSE 3000

#Execute image 
CMD ["npm", "run", "start"]
