class Positionnable {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    setNewRandomCoords() {
      this.x = this.getRandomInt(1, board.width)
      this.y = this.getRandomInt(1, board.height)
    }
    getPosition() {
      return this.x + 'x' + this.y;
    }
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    setNewCoords(x, y) {
      this.x = parseInt(x)
      this.y = parseInt(y)
    }
  }