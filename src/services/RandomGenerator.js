import chalk from 'chalk';

const readlineSync = require('readline-sync');
const SecretKeyGenerator = require('../crypto/SecretKeyGenerator');
const HmacGenerator = require('../crypto/HMACGenerator');

class RandomGenerator {
  constructor() {
    this.keyGenerator = new SecretKeyGenerator();
  }
  
  generateRandomValue(range, prompt = "Try to guess my selection.") {
    const secretKey = this.keyGenerator.generateKey();
    
    const computerNumber = Math.floor(Math.random() * range);
    
    const hmacGenerator = new HmacGenerator(secretKey);
    const hmac = hmacGenerator.generateHmac(computerNumber);
    
    console.log(chalk.cyan,`I selected a random value in the range 0..${range - 1}`);
    console.log(chalk.magenta,`(HMAC=${hmac}).`);
    console.log(chalk.cyan,prompt);
    
    this.displayOptions(range);
    const userInput = this.getUserInput(range);
    
    if (userInput === 'X') {
      console.log(chalk.yellow,"Exiting the game. Thank you for playing!");
      process.exit(0);
    } else if (userInput === '?') {
      this.showHelp();
      return this.generateRandomValue(range, prompt);
    }
    
    const userNumber = parseInt(userInput, 10);
    
    const finalNumber = (computerNumber + userNumber) % range;
    
    console.log(chalk.cyan(`My number is ${computerNumber}`));
    console.log(chalk.magenta(`(KEY=${secretKey}).`));
    console.log(chalk.cyan(`The fair number generation result is ${computerNumber} + ${userNumber} = ${finalNumber} (mod ${range}).`));
    
    return finalNumber;
  }
  
  displayOptions(range) {
    for (let i = 0; i < range; i++) {
      console.log(`${i} - ${i}`);
    }
    console.log(chalk.yellow("X - exit"));
    console.log(chalk.blue("? - help"));
  }
  
  getUserInput(range) {
    const validResponses = [...Array(range).keys()].map(i => i.toString()).concat(['X', '?']);
    return readlineSync.question(chalk.cyan("Your selection: ", {
      limit: validResponses,
      limitMessage: chalk.cyan(`Invalid input. Please enter a number between 0 and ${range - 1}, X to exit, or ? for help.`
    )})).toUpperCase();
  }
  
  showHelp() {
    console.log(chalk.cyan("\nHelp Information:"));
    console.log(chalk.blue("This is a fair random number generator."));
    console.log(chalk.blue("1. The computer generates a secret key and a random number."));
    console.log(chalk.blue("2. It shows you an HMAC of its number (which proves it won't change its choice)."));
    console.log(chalk.blue("3. You select your own number."));
    console.log(chalk.blue("4. The final result is calculated as (computer's number + your number) mod range."));
    console.log(chalk.blue("5. The computer reveals its secret key so you can verify it didn't cheat."));
    console.log(chalk.blue("This ensures neither party can manipulate the outcome unfairly.\n"));
  }
}

module.exports = RandomGenerator;