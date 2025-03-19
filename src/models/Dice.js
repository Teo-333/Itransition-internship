export default class Dice {
    constructor(faces) {
      this.faces = faces;
    }
    
    getFaceValue(index) {
      return this.faces[index % this.faces.length];
    }
    
    getFacesCount() {
      return this.faces.length;
    }
    
    toString() {
      return this.faces.join(',');
    }
  }
  