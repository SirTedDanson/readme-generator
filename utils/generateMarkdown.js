// Creates license badge based on user selection
const renderLicenseBadge = (data) => {
  switch (data.license) {
    case 'Apache License 2.0':
      return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    case 'Boost Software License 1.0':
      return '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
    case 'GNU AGPLv3':
      return '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
    case 'GNU GPLv3':
      return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
    case 'GNU LGPLv3':
      return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    case 'MIT License':
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    case 'Mozilla Public License 2.0':
      return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
  }
}

// Generates link text for License section of README from the license badge markdown string 
const renderLicenseLink = (data) => {
  return renderLicenseBadge(data).split(")]")[1].replace(')','').replace('(','');
}

// Generate the License section of the README (unless NO LICENSE was selected)
const renderLicenseSection = (data) => { 
  if (data.license === 'NO LICENSE') {
    return '';
  }
  return `
  ## License 

  Distributed under ${data.license}. See [License Documentation](${renderLicenseLink(data)}) for more information.

  <p align="right">(<a href="#top">back to top</a>)</p>

  `
}

// Function for generating the Contributor Covenant Code of Conduct
// Industry standard contribution guidelines
const contCov = (data) => {
  if (data.contribute === 'Contributor Covenant (Industry Standard)') {
    return `
  When making contributions please follow the guidelines of the <a href="https://www.contributor-covenant.org/">Contributor Covenant</a>

  <details>
  <summary>Code of Conduct</summary>
  <br/>
  # Contributor Covenant Code of Conduct

  ## Our Pledge

  We as members, contributors, and leaders pledge to make participation in our
  community a harassment-free experience for everyone, regardless of age, body
  size, visible or invisible disability, ethnicity, sex characteristics, gender
  identity and expression, level of experience, education, socio-economic status,
  nationality, personal appearance, race, caste, color, religion, or sexual
  identity and orientation.

  We pledge to act and interact in ways that contribute to an open, welcoming,
  diverse, inclusive, and healthy community.

  ## Our Standards

  Examples of behavior that contributes to a positive environment for our
  community include:

  * Demonstrating empathy and kindness toward other people
  * Being respectful of differing opinions, viewpoints, and experiences
  * Giving and gracefully accepting constructive feedback
  * Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
  * Focusing on what is best not just for us as individuals, but for the overall
  community

  Examples of unacceptable behavior include:

  * The use of sexualized language or imagery, and sexual attention or advances of
  any kind
  * Trolling, insulting or derogatory comments, and personal or political attacks
  * Public or private harassment
  * Publishing others' private information, such as a physical or email address,
  without their explicit permission
  * Other conduct which could reasonably be considered inappropriate in a
  professional setting

  ## Enforcement Responsibilities

  Community leaders are responsible for clarifying and enforcing our standards of
  acceptable behavior and will take appropriate and fair corrective action in
  response to any behavior that they deem inappropriate, threatening, offensive,
  or harmful.

  Community leaders have the right and responsibility to remove, edit, or reject
  comments, commits, code, wiki edits, issues, and other contributions that are
  not aligned to this Code of Conduct, and will communicate reasons for moderation
  decisions when appropriate.

  ## Scope

  This Code of Conduct applies within all community spaces, and also applies when
  an individual is officially representing the community in public spaces.
  Examples of representing our community include using an official e-mail address,
  posting via an official social media account, or acting as an appointed
  representative at an online or offline event.

  ## Enforcement

  Instances of abusive, harassing, or otherwise unacceptable behavior may be
  reported to the community leaders responsible for enforcement at
  ${data.email}.
  All complaints will be reviewed and investigated promptly and fairly.

  All community leaders are obligated to respect the privacy and security of the
  reporter of any incident.

  ## Enforcement Guidelines

  Community leaders will follow these Community Impact Guidelines in determining
  the consequences for any action they deem in violation of this Code of Conduct:

  ### 1. Correction

  **Community Impact**: Use of inappropriate language or other behavior deemed
  unprofessional or unwelcome in the community.

  **Consequence**: A private, written warning from community leaders, providing
  clarity around the nature of the violation and an explanation of why the
  behavior was inappropriate. A public apology may be requested.

  ### 2. Warning

  **Community Impact**: A violation through a single incident or series of
  actions.

  **Consequence**: A warning with consequences for continued behavior. No
  interaction with the people involved, including unsolicited interaction with
  those enforcing the Code of Conduct, for a specified period of time. This
  includes avoiding interactions in community spaces as well as external channels
  like social media. Violating these terms may lead to a temporary or permanent
  ban.

  ### 3. Temporary Ban

  **Community Impact**: A serious violation of community standards, including
  sustained inappropriate behavior.

  **Consequence**: A temporary ban from any sort of interaction or public
  communication with the community for a specified period of time. No public or
  private interaction with the people involved, including unsolicited interaction
  with those enforcing the Code of Conduct, is allowed during this period.
  Violating these terms may lead to a permanent ban.

  ### 4. Permanent Ban

  **Community Impact**: Demonstrating a pattern of violation of community
  standards, including sustained inappropriate behavior, harassment of an
  individual, or aggression toward or disparagement of classes of individuals.

  **Consequence**: A permanent ban from any sort of public interaction within the
  community.

  ## Attribution

  This Code of Conduct is adapted from the [Contributor Covenant][homepage],
  version 2.1, available at
  [https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

  Community Impact Guidelines were inspired by
  [Mozilla's code of conduct enforcement ladder][Mozilla CoC].

  For answers to common questions about this code of conduct, see the FAQ at
  [https://www.contributor-covenant.org/faq][FAQ]. Translations are available at
  [https://www.contributor-covenant.org/translations][translations].

  [homepage]: https://www.contributor-covenant.org
  [v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
  [Mozilla CoC]: https://github.com/mozilla/diversity
  [FAQ]: https://www.contributor-covenant.org/faq
  [translations]: https://www.contributor-covenant.org/translations

  </details>
  `
  }
  return data.contribute;
};

// Generate the markdown text for the README via template literal 
const generateMarkdown = (data) => {
  console.log(data);
  return `
  <div id="top"></div>
  
  ${renderLicenseBadge(data)}
  

  <h1 align="center">${data.title}</h1>

  <p align="center">
    <a href="https://github.com/${data.github}/${data.repo}"><strong>Project Documents »</strong></a>
    <br />
    <br />
    <a href="">View Demonstration</a>
    ·
    <a href="https://github.com/${data.github}/${data.repo}/issues">Report Bug</a>
    ·
    <a href="https://github.com/${data.github}/${data.repo}/issues">Request Feature</a>
  </p>

 
  <details>
    <summary>Table of Contents</summary>
    <ol>
      <li><a href="#description">Description</a></li>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#license">License</a></li>
      <li><a href="#tests">Tests</a></li>
      <li><a href="#questions">Questions</a></li>
    </ol>
</details>


  ## Description 

  ${data.description}

  <p align="right">(<a href="#top">back to top</a>)</p>


  ## Installation

  ${data.installation}

  <p align="right">(<a href="#top">back to top</a>)</p>


  ## Usage 

  ${data.usage} 

  <p align="right">(<a href="#top">back to top</a>)</p>

  
  ${renderLicenseSection(data)}

  ## Contributing

  ${contCov(data)}


  <p align="right">(<a href="#top">back to top</a>)</p>


  ## Tests

  ${data.test}

  <p align="right">(<a href="#top">back to top</a>)</p>


  ## Questions

  For any questions or concerns regarding this project please contact:

  ${data.author} - https://github.com/${data.github} - ${data.email}

  <p align="right">(<a href="#top">back to top</a>)</p>

  `;
}

module.exports = generateMarkdown;