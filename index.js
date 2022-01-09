// Required packages needed for application
const inquirer = require('inquirer');
const generateReadme = require('./src/markdown-template.js');
const writeToFile = require('./utils/generate-file.js');

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
        type: 'confirm',
        name: 'confirmRepo',
        message: 'Does this project have an associated GitHub repository?',
        default: true
      },
      {
        type: 'input',
        name: 'repo',
        message: 'What is the name of the repository?',
        when: ({ confirmRepo }) => confirmRepo
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the associated GitHub username?',
        validate: usernameInput => {
          if (usernameInput) {
            return true;
          } else {
            console.log('Please enter the Github username!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'title',
        message: 'Provide a project title:',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter a project title!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a project description:',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please provide a project description!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Provide instructions for installation:',
        validate: installationInput => {
          if (installationInput) {
            return true;
          } else {
            console.log('Please provide installation instructions!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions for use:',
        validate: usageInput => {
          if (usageInput) {
            return true;
          } else {
            console.log('Please provide usage instructions!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'contribute',
        message: 'Provide guidelines for contributing:',
        choices: ['Contributor Covenant (Industry Standard)', 'Custom']
      },
      {
        type: 'input',
        name: 'custom',
        message: 'Write custom guidelines for contributing:',
        when: ({ contribute }) => {
          if (contribute === 'Custom') {
            return true;
          } else {
            return false;
          }
        },
        validate: contributeInput => {
          if (contributeInput) {
            return true;
          } else {
            console.log('Please provide guidelines for contributing!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'test',
        message: 'Provide instructions for testing:',
        validate: testInput => {
          if (testInput) {
            return true;
          } else {
            console.log('Please provide instructions for testing!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['NO LICENSE', 'Apache License 2.0', 'Boost Software License 1.0', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'MIT License', 'Mozilla Public License 2.0']
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the primary contact for this project?',
        validate: authorInput => {
          if (authorInput) {
            return true;
          } else {
            console.log('Please provide the primary contact for this project!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the associated email address?',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please provide an associated email address!');
            return false;
          }
        }
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
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message);
  })
  .catch(err => {
    console.log(err);
  });