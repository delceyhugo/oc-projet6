class Player extends Positionnable {
    constructor(x, y, name, id, view, hp = 100) {
      super(x, y)
      this.hp = hp
      this.id = id
      this.name = name
      this.view = view
      this.damage = 10
      this.defense = 'Inactive'
    }
    setNewRandomCoords() {
      switch (this.id) {
        case 1:
          this.x = this.getRandomInt(2, (board.width / 2))
          this.y = this.getRandomInt(2, (board.height - 1))
          break;
        case 2:
          this.x = this.getRandomInt(((board.width / 2) + 2), (board.width - 1))
          this.y = this.getRandomInt(2, (board.height - 1))
          break;
      }
    }
    setSettings(name, hp, avatar, view) {
      if (name == "") {
        this.name = "Joueur " + this.id
      } else {
        this.name = name
      }
      if (hp == "") {
        this.hp = 100
      } else {
        this.hp = hp
      }
      this.view = view
      this.avatar = avatar
    }
    checkMove(x, y) {
      let check = true
      let otherPlayer = players[(2 - this.id)]
      if (versus == true){
        check = false
        this.attack()
      }
      if ((((this.x - 4 < x && this.x + 4 > x) && this.y == y) || ((this.y - 4 < y && this.y + 4 > y) && this.x == x)) && versus == false) {
        if (y == this.y && x > this.x) {
          for (let i = this.x; i <= x; i++) {
            let value = (i + 'x' + this.y)
            for (let e = 0; e < caseEmpty.length; e++) {
              if ((caseEmpty[e].x + 'x' + caseEmpty[e].y) == value) {
                check = false
              }
            }
          }
        }
        if (y == this.y && x < this.x){
          for (let i = this.x; i >= x; i--) {
            let value = (i + 'x' + this.y)
            for (let e = 0; e < caseEmpty.length; e++) {
              if ((caseEmpty[e].x + 'x' + caseEmpty[e].y) == value) {
                check = false
              }
            }
          }
        }
        if (x == this.x && y > this.y){
          for (let i = this.y; i <= y; i++) {
            let value = (this.x + 'x' + i)
            for (let e = 0; e < caseEmpty.length; e++) {
              if ((caseEmpty[e].x + 'x' + caseEmpty[e].y) == value) {
                check = false
              }
            }
          }
        }
        if (x == this.x && y < this.y){
          for (let i = this.y; i >= y; i--) {
            let value = (this.x + 'x' + i)
            for (let e = 0; e < caseEmpty.length; e++) {
              if ((caseEmpty[e].x + 'x' + caseEmpty[e].y) == value) {
                check = false
              }
            }
          }
        }
        if ((x + 'x' + y) == players[(2 - this.id)].getPosition()) {
          check = false
          if (this.x - 1 == otherPlayer.x || this.x + 1 == otherPlayer.x || this.y + 1 == otherPlayer.y || this.y - 1 == otherPlayer.y) {
            versus = true
            this.attack()
          }
        }
      } else {
        check = false
      }
      if (check == true) {
        this.move(x, y)
      }
    }
    move(x, y) {
      $("#indicator").remove();
      $(".player" + this.id).remove();
      this.setNewCoords(x, y)
      $('#board').before('<div id="indicator"><p class="round-numero">Round n°' + Math.floor(round/2) + '</p><p class="round-indicator">C\'est le tour de ' + players[round % 2].name + '</p></div>')
      let bool = true
      for (let i = 0; bool && i < weapons.length; i++) {
        if (this.getPosition() == weapons[i].getPosition() && weapons[i].grab == false) {
          weapons[i].grab = true
          if (this.weapon !== undefined) {
            this.weapon.setNewCoords(this.x, this.y)
            this.weapon.grab = false
            $('#' + this.x + 'x' + this.y).append("<img draggable='false' class='weapons " + this.weapon.id + "' src= " + this.weapon.view + "></img>")
            bool = false
          }
          this.weapon = weapons[i]
          this.view = ("assets/players/" + this.avatar + "-" + this.weapon.id + ".gif")
          this.damage = this.weapon.damage
          $('.' + this.weapon.id).remove()
        }
      }
      $('#' + this.x + 'x' + this.y).append('<img class= "player' + this.id + '" src= "' + this.view + '"></img>')
      round++
    }
    attack() {
      let playerHited = players[(2 - this.id)]
      if(playerHited.defense == 'Active'){
        playerHited.hp -= (this.damage/2)
        playerHited.defense = 'Inactive'
      }
      else{
        playerHited.hp -= this.damage
      }
      if (playerHited.hp <= 0) {
        playerHited.death()
      }
      round++
      $("#indicator").remove();
      $('#board').before('<div id="indicator"><p class="round-numero">Round n°' + round + '</p><p class="round-indicator">C\'est le tour de ' + playerHited.name + '</p></div>')
    }
    setDefense(){
      this.defense = 'Active'
      round++
      $("#indicator").remove();
      $('#board').before('<div id="indicator"><p class="round-numero">Round n°' + round + '</p><p class="round-indicator">C\'est le tour de ' + players[(2 - this.id)].name + '</p></div>')
      $(".info-player").remove()
      $(".highlight").removeClass("highlight")
      if(players[0].weapon !== undefined){
        $("#ui-player1").append("<div class='info-player'><h2>"+ players[0].name +"</h2><p>Point de vie : "+ players[0].hp +"</p><p>Défense : "+ players[0].defense +"</p><button id='defense-0' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : "+ players[0].weapon.name +"</p><p>Dégats de l'arme : "+ players[0].weapon.damage +"</p></div>")
      }
      else
      {
        $("#ui-player1").append("<div class='info-player'><h2>"+ players[0].name +"</h2><p>Point de vie : "+ players[0].hp +"</p><p>Défense : "+ players[0].defense +"</p><button id='defense-0' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : Aucune</p><p>Dégats de l'arme : 10</p></div>")
      }
      if(players[1].weapon !== undefined){
        $("#ui-player2").append("<div class='info-player'><h2>"+ players[1].name +"</h2><p>Point de vie : "+ players[1].hp +"</p><p>Défense : "+ players[1].defense +"</p><button id='defense-1' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : "+ players[1].weapon.name +"</p><p>Dégats de l'arme : "+ players[1].weapon.damage +"</p></div>")
      }
      else{
        $("#ui-player2").append("<div class='info-player'><h2>"+ players[1].name +"</h2><p>Point de vie : "+ players[1].hp +"</p><p>Défense : "+ players[1].defense +"</p><button id='defense-1' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : Aucune</p><p>Dégats de l'arme : 10</p></div>")
      }
      if (versus == false){
        if (round % 2 !== 0) {
          players[0].caseHighlight()
        }
        else{
          players[1].caseHighlight()
        }
      }
    }
    death() {
      alert("Victoire de " + players[2 - this.id].name)
      $('.player' + this.id).remove()
      document.location.reload(true);
    }
    caseHighlight(){
      $(".highlight").removeClass("highlight")
      for(let i = this.y-1; i>this.y-4; i--){
        if($("#" + this.x + "x" + i).hasClass("case-empty") == false){
          $("#"+ this.x + "x" + i).addClass("highlight")
        }
        else{break;}
      }
      for(let i = this.y+1; i<this.y+4; i++){
        if($("#" + this.x + "x" + i).hasClass("case-empty") == false){
          $("#"+ this.x + "x" + i).addClass("highlight")
        }
        else{break;}
      }
      for(let i = this.x-1; i>this.x-4; i--){
        if($("#" + i + "x" + this.y).hasClass("case-empty") == false){
          $("#"+ i + "x" + this.y).addClass("highlight")
        }
        else{break;}
      }
      for(let i = this.x+1; i<this.x+4; i++){
        if($("#" + i + "x" + this.y).hasClass("case-empty") == false){
          $("#"+ i + "x" + this.y).addClass("highlight")
        }
        else{break;}
      }
    }
  }
  
  