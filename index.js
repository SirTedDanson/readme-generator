// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateReadme = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
// const questions = [];

// TODO: Create a function to write README file
const writeToFile = readmeInfo => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/README.md', readmeInfo, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'README file created!'
      });
    });
  });
};

// TODO: Create a function to initialize app
const init = () => {
  console.log(`
===============
Create a README
===============
`);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the project title?'
      }
    ])
}

// Function call to initialize app
init()
  .then(data => {
    return generateReadme(data);
  })
  .then(readmeInfo => {
    return writeToFile(readmeInfo);
  });