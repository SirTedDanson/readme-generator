// Required packages needed for application
const inquirer = require('inquirer');
const generateReadme = require('./src/markdown-template.js');
const writeToFile = require('./utils/generate-file.js');

// =========================================================================================
// Gather necessary user input data with Inquirer for README generation
// Initial function for building the user input data object
const promptStart = () => {
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
        message: 'Provide instructions for installation (default list format):',
        validate: installationInput => {
          if (installationInput) {
            return true;
          } else {
            console.log('Please provide installation instructions!');
            return false;
          }
        }
      },
    ]);
};

// Seperate inquirer function for building installation steps array
const installSteps = (data) => {

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'installStep',
        message: '(Type EXIT if finished with insallation instructions) Next Step:',
        validate: installStepInput => {
          if (installStepInput) {
            return true;
          } else {
            console.log('Please provide the next installation step!');
            return false;
          }
        }
      },
    ])
    .then(installStepData => {
      if (!data.installSteps) {
        data.installSteps = [];
      }
      if (installStepData.installStep != 'EXIT') {
        data.installSteps.push(installStepData)
        console.log(data);
        return installSteps(data)
      } else {
        return data;
      }
    })
}

// Bridge question between building two arrays with steps has its own function
const usageQuestion = (data) => {
  console.log(data)
  console.log('inside usageQuestion')
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions for use (default list format):',
        validate: usageInput => {
          if (usageInput) {
            return true;
          } else {
            console.log('Please provide usage instructions!');
            return false;
          }
        }
      }
    ])
    .then(usageList => {
      newData = { ...data, ...usageList }
      console.log(newData);
      return newData;
    })
};

// Seperate inquirer function for building usage steps array
const usageSteps = data => {

  if (!data.usageSteps) {
    data.usageSteps = [];
  }
  console.log(data)
  console.log("in usageSteps function")
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'usageStep',
        message: '(Type EXIT if finished with usage instructions) Next Step:',
        validate: usagenput => {
          if (usagenput) {
            return true;
          } else {
            console.log('Please provide the next usage step!');
            return false;
          }
        }
      },
    ])
    .then(usageStepData => {
      if (usageStepData.usageStep != 'EXIT') {
        data.usageSteps.push(usageStepData)
        return usageSteps(data)
      } else {
        return data;
      }
    })
}

// Final function for building the user input data object
const promptEnd = data => {

  return inquirer
    .prompt([
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
            return true
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
    ])
    .then(finalQuestions => {
      userInputData = { ...data, ...finalQuestions }
      console.log(userInputData);
      return userInputData;
    })
}
//===========================================================================================

// Function call to initialize app
// Application data is managed via a promise chain
promptStart()
  .then(inquirerData => {
    return installSteps(inquirerData);
  })
  .then(inquirerData => {
    return usageQuestion(inquirerData);
  })
  .then(inquirerData => {
    return usageSteps(inquirerData);
  })
  .then(inquirerData => {
    return promptEnd(inquirerData);
  }) // All data is captured from user and sent to the markdown-template module for generation
  .then(userInputData => {
    console.log(userInputData);
    return generateReadme(userInputData);
  }) // Markdown is then written a local .md file
  .then(readmeInfo => {
    return writeToFile(readmeInfo);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message);
  })
  .catch(err => {
    console.log(err);
  });