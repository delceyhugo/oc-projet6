class Weapons extends Positionnable {
    constructor(x, y, id, name, damage, view) {
      super(x, y)
      this.damage = damage;
      this.id = id;
      this.name = name;
      this.view = view;
      this.grab = false
    }
  }
  