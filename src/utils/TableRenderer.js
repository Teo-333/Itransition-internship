import chalk from 'chalk';

import Table from 'cli-table3';

export default class TableRenderer {
  renderProbabilityTable(diceList, probabilityMatrix) {
    console.log(chalk.blueBright("Probability of the win for the user:"));
    
    const header = ['User dice v'].concat(diceList.map(dice => dice.toString()));
    
    const table = new Table({
      head: header,
      style: {
        head: [],
        border: [] 
      }
    });
    
    for (let i = 0; i < diceList.length; i++) {
      const row = [diceList[i].toString()];
      
      for (let j = 0; j < diceList.length; j++) {
        if (i === j) {
          row.push(`- (${probabilityMatrix[i][j].toFixed(4)})`);
        } else {
          row.push(probabilityMatrix[i][j].toFixed(4));
        }
      }
      
      table.push(row);
    }
    
    console.log(table.toString());
    console.log();
  }
}
