module.exports = [{
  type: 'confirm',
  name: 'useMiddleware',
  message: 'Would you like to add a middleware with predefined routes & microservice controllers?',
  default: true
}, {
  type: 'list',
  name: 'middlewareChoice',
  message: 'Choose a predefined middleware (currently only loanOrigination middleware exists)',
  choices: [
    'none',
    'loanOrigination',
    'backOffice',
    'selfService',
  ],
  when: answers => answers.useMiddleware
}]