// Required packages needed for application
const fs = require('fs');

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
        message: '▶ ▶ ▶ README file created! Check the dist/ folder! ◀ ◀ ◀'
      });
    });
  });
};

module.exports = writeToFile;