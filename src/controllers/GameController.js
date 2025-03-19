import chalk from 'chalk';

import readlineSync from 'readline-sync';
import RandomGenerator from '../services/RandomGenerator.js';
import GameRules from '../services/GameRules.js';


export default class GameController {
  constructor(diceList) {
    this.diceList = diceList;
    this.randomGenerator = new RandomGenerator();
    this.gameRules = new GameRules();
    this.playerDice = null;
    this.computerDice = null;
  }
  
  playGame() {
    console.log(chalk.cyan("\nLet's determine who makes the first move."));
    
    const firstMoveResult = this.determineFirstMove();
    
    if (firstMoveResult === 0) {
      console.log(chalk.green("You make the first move!"));
      this.playerChooseFirst();
    } else {
      console.log(chalk.blue("I make the first move!"));
      this.computerChooseFirst();
    }
    
    this.rollDice();
  }
  
  determineFirstMove() {
    return this.randomGenerator.generateRandomValue(2);
  }
  
  playerChooseFirst() {
    this.displayDiceMenu();
    const selection = this.getUserDiceSelection();
    this.playerDice = this.diceList[selection];
    console.log(chalk.cyan(`You choose the [${this.playerDice}] dice.`));
    
    const computerSelection = this.getComputerDiceSelection();
    this.computerDice = this.diceList[computerSelection];
    console.log(chalk.blue(`I choose the [${this.computerDice}] dice.`));
  }
  
  computerChooseFirst() {
    const computerSelection = this.getComputerDiceSelection();
    this.computerDice = this.diceList[computerSelection];
    console.log(chalk.blue(`I choose the [${this.computerDice}] dice.`));
    
    this.displayDiceMenu();
    const selection = this.getUserDiceSelection();
    this.playerDice = this.diceList[selection];
    console.log(chalk.blue(`You choose the [${this.playerDice}] dice.`));
  }
  
  displayDiceMenu() {
    console.log(chalk.yellow("Choose your dice:"));
    for (let i = 0; i < this.diceList.length; i++) {
      if (this.computerDice !== this.diceList[i]) {
        console.log(chalk.blue(`${i} - ${this.diceList[i]}`));
      }
    }
  }
  
  getUserDiceSelection() {
    const validDiceIndices = [];
    for (let i = 0; i < this.diceList.length; i++) {
      if (this.computerDice !== this.diceList[i]) {
        validDiceIndices.push(i.toString());
      }
    }
    
    return parseInt(readlineSync.question(chalk.cyan("Your selection: "), {
      limit: validDiceIndices,
      limitMessage: chalk.red("Invalid selection. Please try again."
    )}), 10);
  }
  
  getComputerDiceSelection() {
    let availableDice = [];
    for (let i = 0; i < this.diceList.length; i++) {
      if (this.playerDice !== this.diceList[i]) {
        availableDice.push(i);
      }
    }
    
    const randomIndex = Math.floor(Math.random() * availableDice.length);
    return availableDice[randomIndex];
  }
  
  rollDice() {
    console.log(chalk.cyan("\nIt's time for my roll."));
    const computerFaceIndex = this.randomGenerator.generateRandomValue(this.computerDice.getFacesCount(), "Add your number modulo " + this.computerDice.getFacesCount() + ".");
    
    const playerFaceIndex = this.randomGenerator.generateRandomValue(this.playerDice.getFacesCount(), "Add your number modulo " + this.playerDice.getFacesCount() + ".");
    
    this.gameRules.determineWinner(this.playerDice, this.computerDice, playerFaceIndex, computerFaceIndex);
  }
}
