const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    {
        type: "input",
        message: "Please enter the title of your project:",
        name: "title"
    },
    {
        type: "input",
        message: "Please enter a description of your project:",
        name: "description"
    },
    {
        type: "input",
        message: "Please enter installation instructions:",
        name: "installation"
    },
    {
        type: "input",
        message: "Please enter any relevant usage information:",
        name: "usage"
    },  
    {
        type: "input",
        message: "Please enter any contribution guidelines:",
        name: "contribution"
    },
    {
        type: "input",
        message: "Please enter any test instructions:",
        name: "test"
    },
    {
        type: "list",
        message: "Please select a license for your program:",
        choices: ["GPL", "Apache", "MIT", "BSD", "None"],
        name: "license"
    },
    {
        type: "input",
        message: "Please enter your GitHub username:",
        name: "githubID"
    },
    {
        type: "input",
        message: "Please enter your public email address:",
        name: "email"
    }
];

// function to write README file
function generateReadMe(data) {
    return `# ${data.title}
    License: ${data.license}

    ${data.description}

    ## Table of Contents
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)
    

    ## Installation

    ${data.installation}

    ## Usage

    ${data.usage}

    ## License

    ${data.license}

    ## Contributions

    ${data.contribution}

    ## Tests

    ${data.test}

    ## Questions

    Please contact me via GitHub: github.com/${data.githubID}
    You can reach me via email at: ${data.email}
    `

}

// function to initialize program
function init() {
    return inquirer.prompt(questions);
}

// function call to initialize program and throw error if needed
init().then(function(data){
    const readMeText = generateReadMe(data);

    return writeFileAsync("README.md", readMeText);

}).then(function(){
    console.log("Successfully wrote to README.md");
}).catch(function(err){
    console.log(err);
 });  
