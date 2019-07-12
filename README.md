# Backend Engineering Assignment

Henry Chao - Submission

- [Backend Engineering Assignment](#Backend-Engineering-Assignment)
  - [Getting Started](#Getting-Started)
  - [Assessment](#Assessment)
  - [Framework and Dependencies](#Framework-and-Dependencies)
  - [Security and Performance Considerations](#Security-and-Performance-Considerations)
  - [Deployments and Testing](#Deployments-and-Testing)
    - [Docker](#Docker)
    - [Docker Compose and Testing](#Docker-Compose-and-Testing)
    - [Lambda Deployment and Testing](#Lambda-Deployment-and-Testing)

## Getting Started

The server requires the following programs:

- [yarn](https://yarnpkg.com/en/)
- [nodejs v10.16.0LTS](https://nodejs.org/en/)
- [postgresql](https://www.postgresql.org/)

To get started locally, set up the necessary environment variables by copying the `.env.sample` file to `.env` in the project root. Modify the values for your local environment, for example:

```bash
JWT_SECRET_KEY="abcdefg123456"
DATABASE_NAME="alchemy_dev"
DATBASE_HOST="localhost"
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="postgres"

```

Then run the following commands on the project root directory:

```bash
yarn
yarn db-build
yarn db-migrate
yarn start
```

This will install the needed npm dependencies and start a server running locally on port `3000` by default.

## Assessment

To execute the assessment execute the `yarn asssess` command. This will trigger the `newman` run and return the assessment results (see the details of the `newman` run command within the `package.json` file). You can use the `yarn db-refresh` command to destroy/rebuild the DB between runs if needed.

**Note:**

The `assessment.json` and `environment.json` files in this repository is slightly modified to chain the requests made as part of the test suite in order to pass key values and parameters between test cases. More specifically, JWT tokens and Player ID values are extracted from one test run and stored as an environment variable to be used in successive tests. This helps with running the tests using the CLI as bearer token values do not need to be manually set upon each user creation/login run.

## Framework and Dependencies

NodeJS was chosen to run the server for this assessment, as it is the target runtime for the project we are onboarding. [ExpressJS](https://expressjs.com/) was chosen as the framework due to its minimalist footprint, as well as its wide community support and extensions currently available.

[Winston](https://github.com/winstonjs/winston#readme) is a logging middleware to help with managing logging for the application. It helps centralize management of logging for maintainability (if we need to change logging format, if we need to change where logs are sent, etc.).

[PassportJS](http://www.passportjs.org/) is used to help handle using JWT for authorization on the protected routes in the application. It not only helps simplify this authorization requirement, integrates well with ExpressJS, and more importantly, supports using common authorization/authentication services like Facebook, Google, or OAuth2. If the server is extended in the future to support these services, the middleware is in place already.

[Sequelize](http://docs.sequelizejs.com/) was chosen as an ORM to help connect the server with the database layer. While there is a slight learning curve for developers who are not familiar with Sequelize, it does greatly assist with managing the connections between the backend and database layers, as well as abstract querying the database to a more programmatically and Javascript friendly way.

[Babel](https://babeljs.io/) is a Javascript compiler used by the project to allow for developing using the latest version of Javascript while still maintaining backwards compatability with older NodeJS servers. Babel is also used to prepare a production-ready version of the application for deployments.

[Jest](https://jestjs.io/) is a Javascript testing framework which is used to performed unit tests for the application server. It is a lightweight and commonly used testing framework (APIs and issues are well documented online). You can execute these unit tests by running the `yarn test` command. Due to timing and bandwidth constraints, the test suite is unfortunately not 100% complete (ideally we would try to cover the controller classes, as well as perform integration testing with the database layer as well).

Newman is used for the assessment testing, but it has also been extended to perform regression testing for this project as well. To execute these tests, run the `yarn regression-test` command to view the newman output. These tests go further than the assessment, by also testing failure scenarios (creating a user that already exists), and basic security sanity checks (an admin is unable to view players they did not create).

[NodeJsScan](https://github.com/ajinabraham/NodeJsScan) is a static code analysis utility used to perform scans of the application code. You can execute this scan locally by running the `yarn static-scan` command. **However**, note that this command runs a docker container with the application, and will require Docker to be installed on your local system. Additionally, the CLI version of the application is hosted by a private owner, and security/reliability cannot be ensured. Thus, static code analysis should ideally be performed internally by a system self-managed, and should be integrated as part of a CI/CD pipeline process.

## Security and Performance Considerations

- Input validation is currently not performed, but should be integrated for a production system. Since the API would be exposed to the public, we would not trust any input received, and should perform validation/linting to safely receive input values.
- Since we are not using sessions to manage connections between the client and server, the JWT should be set to expire after some time (in order to limit the attack surface of having long-living JWTs). However, this also introduces the need to integrate refresh tokens to allow clients to properly extend the terms of their authorization as well.
- The NodeJS server here is designed to run and serve the API gateway for requests. However, it is poorly secured and not optimized to handle client connections. The server should be ran behind a reverse proxy server, which would focus on establishing the correct HTTP header values for security, as well as handle connection pooling and session management with clients.

## Deployments and Testing

### Docker

If you want to test this application using Docker, ensure that you have the [latest version downloaded](https://www.docker.com/products/docker-desktop) and running locally. Then run the following commands from the project root directory:

```bash
yarn build
docker build -t be_exercise .
```

Once the image is build, you can run it locally and have it listen on port 3000 with the following command:

```bash
docker run -d --name be_exercise -p 3000:3000 -e JWT_SECRET_KEY=asdf1234 be_exercise
```

You should then be able to send a GET request to the `/api/ping` route to check that the server is running:

```bash
>> curl http://localhost:3000/api/ping
pong%
```

This docker image would behave as if it was to be deployed into a production environment, such as in [AWS ECS](https://aws.amazon.com/ecs/). For security and portability, environment variables (such as the database host and name) would be passed into the docker container at run time, as well as secret values (such as the JWT secret and database credentials).

### Docker Compose and Testing

If you want to test the application locally, and you have [docker compose](https://docs.docker.com/compose/) installed, you can execute the following command to start a local testing environment:

```bash
yarn build
docker build -t be_exercise .
docker-compose up -d
docker exec be_exercise yarn db-build
docker exec be_exercise yarn db-migrate
```

You can then run Postman or Newman against your `localhost:3000` for the assessment. Or alternative run the `yarn assess` or `yarn regression-test` command.

Run `docker-compose down` after testing is complete to shut down the containers.

### Lambda Deployment and Testing

To create a lambda deployment for AWS, run the `yarn lambda` command. This will create a `deploy.zip` file within the `bin` directory. You can then upload that zip file into AWS Lambda.

For local testing, you can also use the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
