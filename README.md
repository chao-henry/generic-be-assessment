# Backend Engineering Assignment

Henry Chao - Submission

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
yarn start
```

This will install the needed npm dependencies and start a server running locally on port `3000` by default.

## Assessment

To execute the assessment execute the `yarn asssess` command. This will trigger the `newman` run and return the assessment results (see the details of the `newman` run command within the `package.json` file).
