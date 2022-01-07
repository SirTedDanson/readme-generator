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
        message: 'Provide a project title?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a project description'
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Provide instructions for installation'
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions for use'
      },
      {
        type: 'list',
        name: 'contribute',
        message: 'Provide guidelines for contributing',
        choices: ['Contributor Covenant', 'Custom']
      },
      {
        type: 'input',
        name: 'custom',
        message: 'Write guidelines for contributing',
        when: ({ contribute }) => {
          if (contribute === 'Custom') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'test',
        message: 'Provide instructions for testing'
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a license',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense']
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the associated GitHub username?'
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the associated email address?'
      },
    ]);
};

// Function call to initialize app
init()
  .then(data => {
    return generateReadme(data);
  })
  .then(readmeInfo => {
    return writeToFile(readmeInfo);
  });