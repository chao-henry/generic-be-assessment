# Hello aspiring Backend Alchemist!

We wanna see what you've got, we've created a couple language specific assessments but we believe in letting people use the tools they are most comfortable with. You can use any programming language / framework / database you want, getting the 5 test cases to pass is a passing assessment. We can't wait to see what you build. Check the API.md file for implementation details.

If you'd like to try one of our language specific solutions they can be found below.
- [Node](https://github.com/pgalchemy/players-api-skeleton)
- [Ruby](https://github.com/pgalchemy/players-api-ruby)

## Pre-Requisites

Newman is a language agnostic API tester based on Postman

To run Newman, ensure that you have Node.js >= v6. [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/).

The easiest way to install Newman is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```console
$ npm install -g newman
```

## Grading Criteria
### Junior Level
- Provided Tests are passing
- Ability to clearly explain your choice of technology, language, framework, and dependencies
- Your solution fulfills the endpoints of API.md
### Mid Level
- All the above + 
- You implement defensive programming practices (static analysis / linting / unit or e2e tests)
- Your code is DRY albeit a bit paranoid
- You can explain security and performance considerations
### Senior Level
- All the above +
- Your code is legible and clear to someone that might not even be familiar with the language
- You can present a plan for how you would take your project from planning to deployment and maintenance
- Someone walks away from reviewing your project having learned something 

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
