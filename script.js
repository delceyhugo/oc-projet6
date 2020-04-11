class Positionnable{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  getPosition(){
    return this.x + 'x' + this.y;
  }
}

class Case extends Positionnable{
  constructor(x,y){
    super(x,y);
  }
}
class CaseEmpty extends Case{
  constructor(x,y){
    super(x,y);
  }
  setNewRandomCoords(){
    this.x = getRandomInt(1,11)
    this.y = getRandomInt(1,11)
  }
}
class Weapons extends Positionnable{
  constructor(x,y,name,damage,){
    super(x,y)
    this.damage = damage;
    this.name = name;
  }
  setNewRandomCoords(){
      this.x = getRandomInt(1,11)
      this.y = getRandomInt(1,11)
    }
}
class Player extends Positionnable{
  constructor(x,y,name,id,view,hp = 100){
    super(x,y);
    this.hp = hp;
    this.id = id;
    this.name = name;
    this.view = view;
  }
  setNewCoords(x,y){
    this.x = x
    this.y = y
  }
  setNewRandomCoords(){
    switch(this.id){
      case 1 : 
        this.x = getRandomInt(2,10)
        this.y = getRandomInt(2,5)
        break;
      case 2 : 
        this.x = getRandomInt(2,10)
        this.y = getRandomInt(7,10)
        break;
    }
  }
  Move(x,y){
    if (((parseInt(this.x)-4<x && parseInt(this.x)+4>x) && this.y == y) || ((parseInt(this.y)-4<y && parseInt(this.y)+4>y) && this.x == x)){
      console.log("true")
      $('.' + this.name).remove();
      this.setNewCoords(x,y)
      $('.' + this.x + 'x' + this.y).append('<img class=' + this.name + ' src="assets/' + this.view + '"></img>');
      round += 1
    }
    else{
       console.log("false")
    }
  }
  PlayerDeath(){
    console.log((this.name) + "est mort")
    round = 0
  }
}

// FONCTIONS

// Généré un entier aléatoir entre "min"(inclus) et "max"(exclu)
function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max-min) + min);
}

function isEqual(){ 
  for(let i = 0; i<allObjet.length; i++){
    let value = (allObjet[i].x + 'x' + allObjet[i].y)
    for(let e = 0; e<allObjet.length; e++){
      if((allObjet[e].x + 'x' + allObjet[e].y) == value && i !== e ) {
      allObjet[e].setNewRandomCoords()
      i=0
      e=0
      }
    }
  } 
}

let allObjet = []

// Génération des cases inaccessible 
const caseEmpty1 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty2 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty3 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty4 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty5 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty6 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty7 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty8 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty9 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty10 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty11 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty12 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty13 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty14 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty15 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty16 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty17 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty18 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty19 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty20 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty21 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty22 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty23 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty24 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
const caseEmpty25 = new CaseEmpty(getRandomInt(1,11),getRandomInt(1,11))
allObjet.push(caseEmpty1,caseEmpty2,caseEmpty3,caseEmpty4,caseEmpty5,caseEmpty6,caseEmpty7,caseEmpty8,caseEmpty9,caseEmpty10,caseEmpty11,caseEmpty12,caseEmpty13,caseEmpty14,caseEmpty15,caseEmpty16,caseEmpty17,caseEmpty18,caseEmpty19,caseEmpty20,caseEmpty21,caseEmpty22,caseEmpty23,caseEmpty24,caseEmpty25)
let CoordsCaseEmpty = [caseEmpty1,caseEmpty2,caseEmpty3,caseEmpty4,caseEmpty5,caseEmpty6,caseEmpty7,caseEmpty8,caseEmpty9,caseEmpty10,caseEmpty11,caseEmpty12,caseEmpty13,caseEmpty14,caseEmpty15,caseEmpty16,caseEmpty17,caseEmpty18,caseEmpty19,caseEmpty20,caseEmpty21,caseEmpty22,caseEmpty23,caseEmpty24,caseEmpty25]

// Génération des joueurs
const player1 = new Player(getRandomInt(2,10),getRandomInt(2,5),"player1",1,"user-blue.svg")
const player2 = new Player(getRandomInt(2,10),getRandomInt(7,10),"player2",2,"user-red.svg")
allObjet.push(player1,player2)
let Players = [player1,player2]

// Génération des armes
const weapon1 = new Weapons(getRandomInt(1,11),getRandomInt(1,11),"Mitraillette",20)
const weapon2 = new Weapons(getRandomInt(1,11),getRandomInt(1,11),"Fusil D'assault",25)
const weapon3 = new Weapons(getRandomInt(1,11),getRandomInt(1,11),"Fusil de Sniper",35)
const weapon4 = new Weapons(getRandomInt(1,11),getRandomInt(1,11),"Bazooka",50)
allObjet.push(weapon1,weapon2,weapon3,weapon4)
let weapons = [weapon1,weapon2,weapon3,weapon4]


// Vérification de doublons de coordonnées 
isEqual()

// Affichage sur la page HTML
$(document).ready(function(){
  $('.' + player1.x + 'x' + player1.y).append("<img class='player1' src='assets/user-blue.svg'></img>");
  $('.' + player2.x + 'x' + player2.y).append("<img class='player2' src='assets/user-red.svg'></img>");
  for(let i = 0; i<weapons.length; i++){ 
    switch(weapons[i].name){
      case "Mitraillette" :
        $('.' + weapons[i].x + 'x' + weapons[i].y).append("<img src='assets/weapons/mitraillette.png'></img>");
        break;
      case "Fusil D'assault" : 
        $('.' + weapons[i].x + 'x' + weapons[i].y).append("<img src='assets/weapons/fusil-assaut.png'></img>");
        break;
      case "Fusil de Sniper" : 
        $('.' + weapons[i].x + 'x' + weapons[i].y).append("<img src='assets/weapons/fusil-sniper.png'></img>");
        break;
      case "Bazooka" :
        $('.' + weapons[i].x + 'x' + weapons[i].y).append("<img src='assets/weapons/bazooka.png'></img>");
        break;
    }
  }
  for(let i = 0; i<CoordsCaseEmpty.length; i++){
    $('.' + CoordsCaseEmpty[i].x + 'x' + CoordsCaseEmpty[i].y).addClass('case-empty');
  }
});




let round = 1
let moveCoord

$(".square").on("click",function(){
  moveCoord = $(this).attr("id")
  let splitMoveCoord = moveCoord.split('x')
  if(round%2 !== 0){
    player1.Move(splitMoveCoord[0],splitMoveCoord[1])
  }
  else{
    player2.Move(splitMoveCoord[0],splitMoveCoord[1])
  }
  //-> if->CoordsCaseEmpty==moveCoord->retry  else->move coods
})


/*
i=0
 chaque tour i++
 1 -> joueur 1 se déplace
        ne peut pas se déplacé sur les cases inaccessible
        peut se déplacé de 1 a 3 case verticalement et horizontalement


 2 -> joueur 2 se déplace


 3x3

entre 0 et 6 en x
entre 0 et 6 en y

*/