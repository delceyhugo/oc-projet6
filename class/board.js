class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    newBoard() {
      $("body").append("<style type='text/css'>#board {grid-template-columns: repeat(" + this.width + ", 3vw);grid-template-rows: repeat(" + this.height + ", 3vw);}</style>")
      let x = 1
      let y = 1
      for (let i = 0; i < (this.width * this.height); i++) {
        $("#board").append("<div id=" + x + "x" + y + " class='case'></div>")
        if (x == this.width) {
          x = 1
          y++
        } else {
          x++
        }
      }
      this.moveTrigger()
    }
    generation() {
      // Génération des cases inaccessibles 
      console.log("Génération des cases inaccessibles")
      for (let i = 0; i < ((this.width * this.height) * 0.25); i++) {
        let value = (new CaseEmpty(this.getRandomInt(1, 11), this.getRandomInt(1, 11)))
        allObjet.push(value)
        caseEmpty.push(value)
      }
      // Génération des joueurs
      console.log("Génération des joueurs")
      let player1 = (new Player(this.getRandomInt(2, (this.width / 2)), this.getRandomInt(2, (this.height - 1)), "player1", 1, ""))
      let player2 = (new Player(this.getRandomInt(((this.width / 2) + 2), (this.width - 1)), this.getRandomInt(2, (this.height - 1)), "player2", 2, ""))
      allObjet.push(player1, player2)
      players.push(player1, player2)
      // Génération des armes
      console.log("Génération des armes")
      let weapon1 = new Weapons(this.getRandomInt(1, this.width), this.getRandomInt(1, this.height), "regular_sword", "Epée", 25, "assets/weapons/regular_sword.png")
      let weapon2 = new Weapons(this.getRandomInt(1, this.width), this.getRandomInt(1, this.height), "axe", "Hache", 30, "assets/weapons/axe.png")
      let weapon3 = new Weapons(this.getRandomInt(1, this.width), this.getRandomInt(1, this.height), "hammer", "Marteau", 35, "assets/weapons/hammer.png")
      let weapon4 = new Weapons(this.getRandomInt(1, this.width), this.getRandomInt(1, this.height), "golden_sword", "Epée en or", 40, "assets/weapons/golden_sword.png")
      allObjet.push(weapon1, weapon2, weapon3, weapon4)
      weapons.push(weapon1, weapon2, weapon3, weapon4)
      // Vérification de doublons de coordonnées 
      this.isEqual()
    }
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    display() {
      // Affichage cases innacessible
      console.log("Affichage cases innacessible")
      for (let i = 0; i < caseEmpty.length; i++) {
        $('#' + caseEmpty[i].x + 'x' + caseEmpty[i].y).addClass('case-empty');
      }
      console.log("Affichage joueurs")
      // Affichage joueurs
      $('#' + players[0].x + 'x' + players[0].y).append("<img draggable='false' class='player1' src=" + players[0].view + "></img>");
      $('#' + players[1].x + 'x' + players[1].y).append("<img draggable='false' class='player2' src=" + players[1].view + "></img>");
      // Affichage armes
      for (let i = 0; i < weapons.length; i++) {
        $('#' + weapons[i].x + 'x' + weapons[i].y).append("<img draggable='false' class='weapons " + weapons[i].id + "' src= " + weapons[i].view + "></img>");
      }
      $('#board').before('<div id="indicator"><p class="round-numero">Round n°0</p><p class="round-indicator">C\'est le tour de ' + players[0].name + '</p></div>')
    }
    isEmpty(x, y) {
      for (let i = 0; i < caseEmpty.length; i++) {
        if ((caseEmpty[i].x + 'x' + caseEmpty[i].y) == (x + 'x' + y)) {
          return true
        }
      }
    }
    isEqual() {
      console.log("Check des doublons")
      for (let i = 0; i < allObjet.length; i++) {
        let value = (allObjet[i].x + 'x' + allObjet[i].y)
        for (let e = 0; e < allObjet.length; e++) {
          if ((allObjet[e].x + 'x' + allObjet[e].y) == value && i !== e) {
            allObjet[e].setNewRandomCoords()
            i = 0
            e = 0
          }
        }
      }
    }
    moveTrigger() {
      // Mouvement des joueurs
      $(".case").on("click", function () {
        setTimeout(function(){
          $(".info-player").remove()
          board.defenseCheck()
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
        }, 50); 
        let moveCoord = $(this).attr("id")
        let splitMoveCoord = moveCoord.split('x')
        if (round % 2 !== 0) {
          players[0].checkMove(splitMoveCoord[0], splitMoveCoord[1])
        } else {
          players[1].checkMove(splitMoveCoord[0], splitMoveCoord[1])
        }
      })
    }
    defenseCheck(){
      setTimeout(function(){
        $(".defense").on("click", function(){
          for(let i = 0; i<2; i++)
          if(($(this).attr("id") == ("defense-0")) && round % 2 !== 0 ){
              players[0].setDefense()
            }
          else if(($(this).attr("id") == ("defense-1")) && round % 2 !== 1 ){
            players[1].setDefense()
          }
        })
      }, 10)
    }
  }