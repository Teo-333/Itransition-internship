import chalk from 'chalk';
import Dice from '../models/Dice.js'

export default class DiceParser {
  constructor(args) {
    this.args = args;
  }
  
  parse() {
    const diceList = [];
    
    for (const arg of this.args) {
      if (!this.validateDiceFormat(arg)) {
        throw new Error(chalk.red(`Invalid dice format: ${arg}. Expected format: comma-separated integers (e.g., 2,2,4,4,9,9)`));
      }
      
      const faces = arg.split(',').map(face => parseInt(face, 10));
      diceList.push(new Dice(faces));
    }
    
    return diceList;
  }
  
  validateDiceFormat(diceString) {
    return /^(\d+,)*\d+$/.test(diceString);
  }
}
