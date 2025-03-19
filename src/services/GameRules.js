import chalk from 'chalk';

class GameRules {
    determineWinner(playerDice, computerDice, playerFaceIndex, computerFaceIndex) {
      const playerValue = playerDice.getFaceValue(playerFaceIndex);
      const computerValue = computerDice.getFaceValue(computerFaceIndex);
      
      console.log(chalk.cyan(`My roll result is ${computerValue}.`));
      console.log(chalk.cyan(`Your roll result is ${playerValue}.`));
      
      if (playerValue > computerValue) {
        console.log(chalk.green(`You win (${playerValue} > ${computerValue})!`));
        return 'player';
      } else if (computerValue > playerValue) {
        console.log(chalk.red(`I win (${computerValue} > ${playerValue})!`));
        return 'computer';
      } else {
        console.log(chalk.yellow(`It's a tie (${playerValue} = ${computerValue})!`));
        return 'tie';
      }
    }
  }
  
  module.exports = GameRules;