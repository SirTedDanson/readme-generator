// Required packages needed for application
const fs = require('fs');
const inquirer = require('inquirer');
const generateReadme = require('./utils/generateMarkdown.js');

// Writes data to a README.md file in the dist/ folder
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

// Gather necessary user input data with Inquirer for README generation
const readmePrompts = () => {
  console.log(`
===============
Create a README
===============
`);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'repo',
        message: 'What is the name of the repository?'
      },
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
        choices: ['Contributor Covenant (Industry Standard)', 'Custom']
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
        choices: ['NO LICENSE', 'Apache License 2.0', 'Boost Software License 1.0', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'MIT License', 'Mozilla Public License 2.0']
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the primary contact for this project?'
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
      }
    ]);
};

// Function call to initialize app
readmePrompts()
  .then(data => {
    return generateReadme(data);
  })
  .then(readmeInfo => {
    return writeToFile(readmeInfo);
  });