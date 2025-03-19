export default class ProbabilityCalculator {
    constructor(allDice) {
      this.allDice = allDice;
    }
    
    calculateWinProbabilityMatrix() {
      const numDice = this.allDice.length;
      const matrix = Array(numDice).fill().map(() => Array(numDice).fill(0));
      
      for (let i = 0; i < numDice; i++) {
        for (let j = 0; j < numDice; j++) {
          if (i !== j) {
            matrix[i][j] = this.calculateWinProbability(this.allDice[i], this.allDice[j]);
          } else {
            matrix[i][j] = 0.3333; 
          }
        }
      }
      
      return matrix;
    }
    
    calculateWinProbability(dice1, dice2) {
      let wins = 0;
      let total = 0;
      
      for (let i = 0; i < dice1.getFacesCount(); i++) {
        for (let j = 0; j < dice2.getFacesCount(); j++) {
          total++;
          if (dice1.getFaceValue(i) > dice2.getFaceValue(j)) {
            wins++;
          }
        }
      }
      
      return wins / total;
    }
  }
  