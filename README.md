# as-team1-ui

## Running
There are two ways to run the development server:

### Standard
`npm run start`

This starts the development server, but if any changes are made, you must stop and restart the development server

### Hot Reload
`npm run hotReloadDev`

This starts the development server, it will automatically restart when changes are made and saved.


## Running this application via Docker
### Running Docker Container locally for front end
To run this application via Docker, install Docker using the following command:

`npm install Docker`

Our Dockerfile contains multi-stage building instructions to set up our docker image. 
You shouldn't need to alter this file.


### Docker Compose
We use Docker Compose as a way of starting and managing the relationships between our containers.
Our front end container is dependent on our backend container running so database information can be displayed in our web pages.

Docker Compose is installed by default when Docker is installed.
To validate that Docker Compose is installed, it's version and location in your system, run:

`docker compose version`
`docker which`

### Building and running docker containers locally
First off, we need to set a local environment variable in our .zshrc for an API_URL.
Add the following to your .zshrc:

`export API_URL="http://localhost:8080"`
`source .zshrc`

Source from both your home directory (if using terminal) and in your working github branch in VScode (e.g. checkout to your current working branch and type `source ~/.zshrc`)

To build a docker container to run locally from our docker image, use the following command:

`docker build --build-arg API_URL=${API_URL} -t team1-ui:1.0 .`

This will build a docker container, passing in the API_URL environment variable from the .zshrc file on your system.

We set a name of our container 'team1-ui' and set a tag using '-t' and ':1.0' as the version.

We can run our container on a specified port using the command:

`docker run -p 3000:3000 team1-ui:1.0`

This runs the container on port 3000. We can cancel it running by using 'cntl + C' via keyboard.

If we need to make any changes to our container, cancel it running, then rebuild the container but increment the version - e.g. team1-ui:1.1

When running containers locally, we will be able to see and navigate our site, but database information will only be returned when running Docker Compose, see below.

### Building and running docker containers via Docker Compose
To see database information retrieved, we need to orchestrate the relationship between our frontend container and our backend container.

Docker compose helps us map containers to our localhost, to avoid any axios errors which are caused by containers not being able to communicate with each other.

To enable this locally, you'll need to update your host settings using the following commands:

`sudo vi /etc/hosts`

In this file you'll see some localhost and broadcasthost settings. 
Any the following beneath those settings:

# Engineering Academy
127.0.0.1       backend
127.0.0.1       frontend

When you have added these, hit 'escape' and then type :wq to exit.
Use the following command to read the settings:

`cat /etc/hosts`

These settings link to the docker-compose.yml, where we run our frontend on port 3000 and our backend on port 8080. 

When these settings are updated and the docker-compose.yml file is set up, then re-source your file inside your terminal and in your working github directory, then run docker-compose:

`docker-compose up`

From here you'll be running your two containers in tandem, with all data retrieved from DB.
On running this it will run both an instance of the backend on 8080, and frontend on 3000.


## Examples of environment variables
Please see the .env.example file in this directory.


## Linting
Lint checks will be performed automatically by Husky when you attempt to commit. You can manually run a lint check using `npm run lint`

To fix any violations that can automatically be rectified run `npm run lintFix`


## Testing 
### All Tests
You can run all tests using `npm run test`

### Unit Tests
You can run all unit tests using `npm run testUnit`

### Integration Tests
You can run all integrtion tests using `npm run testIntegration`

