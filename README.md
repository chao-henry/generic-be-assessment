# Hello aspiring Backend Alchemist!

We wanna see what you've got, we've created a couple language specific assessments but we believe in letting people use the tools they are most comfortable with. You can use any programming language you want, getting the 5 test cases to pass is a passing assessment. We can't wait to see what you build. Check the API.md file for implementation details.

## Pre-Requisites

Newman is a language agnostic API tester based on Postman

To run Newman, ensure that you have Node.js >= v6. [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/).

The easiest way to install Newman is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```console
$ npm install -g newman
```

## Running tests

### This assumes your API is running on port 3000

```console
$ newman run assessment.json -g environment.json
```

### For running against a different port

```console
$ newman run assessment.json -g environment.json --global-var "port=8080"
```

Note: You can also import assessment.json into a Postman collection

Upload your completed assessment to git or send us your zip file.
