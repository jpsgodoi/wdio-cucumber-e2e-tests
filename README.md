# wdio-cucumber-e2e-tests

## Initial Instructions

Install nvm 
- https://github.com/coreybutler/nvm-windows/releases

Install the latest node
```sh
nvm install 16.13.2
```

Use node
```sh
nvm use 16.13.2
```

Test if node and npm versions are fine
```sh
node -v   (should display 16.13.2)
npm -v   (should display 8.1.2)
```

- Download VSCode https://code.visualstudio.com/download
- Download Git https://git-scm.com/downloads


## Setup Instructions
- Create a folder ex: (C:\Users\doi\Repos\<project-name>)
- Open folder in command line 
- Create the package.json file, type: npm init
- Trigger the @wdio/cli package installer wizard, type: npm init wdio .
- Answer the questions


## Install VSCode extensions
| Name | Description |
| ------ | ------ |
|Vscode-icons | Icons for vs code for better user experience|
|Prettier | Enforces consistent code style|
|Path intellisense | Autocomplete filenames|
|Npm intellisense | Helps when importing external packages|
|Javascript ES6 code snippets | Snippets (reusable pieces of code)  for javascript|
|Cucumber | Adds support for cucumber|
|Code Runner | Play .ts file instead of using terminal|
|Gitignore | Assists us working with .gitignore files|
|DotEnv | VSCode .env syntax highlighting and autosuggestion|
|Surround With | Wraps a code selection in an "if" or "try/catch" block with proper indentation|

## Running tests
npx wdio wdio.conf.ts

## Important Comments
- Async/await
  - In webdriverIO, every browser and every element command is a promise and  has to be awaited.
  - We need to await every sentence, otherwise it will be triggered asynchronous
- A very handy way to create tests running the browser and testing the commands at once is by adding the repl command
  - Read-eval-print loop
  - Npx wdio repl chrome
- Use winston for logging!
- To run tests locally in firefox
  - npm i --save-dev wdio-geckodriver-service geckodriver
  - Add geckodriver as service
  - Add firefox capability
- To integrate with the database
  - npm i --save-dev mssql @types/mssql msnodesqlv8
- Format Prettier = Shift + Alt + F

## Important links
- Github accounts https://blog.gitguardian.com/8-easy-steps-to-set-up-multiple-git-accounts/
- SSH https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh
- Demo page https://opensource-demo.orangehrmlive.com/
- Practice weblocators https://the-internet.herokuapp.com/
- Timeouts https://webdriver.io/docs/timeouts
- To test API requests https://reqres.in/

## Glossary

| Name | Description |
| ------ | ------ |
| nvm | node version manager |
| npm | node package manager |
| VSCode | visual studio code |
| wdio | Webdriver IO |
| chai | Chai is a BDD / TDD assertion library for node and the browser for JS |
