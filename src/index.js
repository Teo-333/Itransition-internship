import chalk from 'chalk';

const DiceParser = require('./utils/DiceParser');
const GameController = require('./controllers/GameController');
const ProbabilityCalculator = require('./services/ProbabilityCalculator');
const TableRenderer = require('./utils/TableRenderer');

function main() {
  try {
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
      console.log(chalk.red("Error: At least 3 dice configurations are required."));
      console.log(chalk.yellow("Example: node src/index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"));
      process.exit(1);
    }
    
    const diceParser = new DiceParser(args);
    const diceList = diceParser.parse();
    
    const probabilityCalculator = new ProbabilityCalculator(diceList);
    const probabilityMatrix = probabilityCalculator.calculateWinProbabilityMatrix();
    const tableRenderer = new TableRenderer();
    tableRenderer.renderProbabilityTable(diceList, probabilityMatrix);
    
    const gameController = new GameController(diceList);
    gameController.playGame();
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

main();