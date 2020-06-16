// Déclaration des variables

let allObjet = []
let coordsCase = []
let caseEmpty = []
let players = []
let weapons = []
let round = 1
let board
let game = false
let versus = false


// Affichage sur la page HTML
$(document).ready(function () {
  // Landing Page
  $("#new-game").on("click", function () {
    // Paramètre généraux
    game = true
    console.log("New Game")
    if ($("#board-x").val() == '' || $("#board-y").val() == '') {
      board = new Board(15, 15)
      board.newBoard()
    } else {
      board = new Board($("#board-x").val(), $("#board-y").val())
      board.newBoard()
    }
    board.generation()
    // Paramètre Player 1
    players[0].setSettings($("#player1-name").val(), $("#player1-hp").val(), $("#carouselPlayer1").find(".active").find('img').attr("id"), $("#carouselPlayer1").find(".active").find('img').attr("src"))
    // Paramètre Player 2
    players[1].setSettings($("#player2-name").val(), $("#player2-hp").val(), $("#carouselPlayer2").find(".active").find('img').attr("id"), $("#carouselPlayer2").find(".active").find('img').attr("src"))
    // landing-page slide up
    board.display()
    if (round % 2 !== 0) {
      players[0].caseHighlight()
    }
    else{
      players[1].caseHighlight()
    }
    $("#landing-page").slideUp()
    $("#ui-player1").append("<div class='info-player'><h2>"+ players[0].name +"</h2><p>Point de vie : "+ players[0].hp +"</p><p>Défense : "+ players[0].defense +"</p><button id='defense-0' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : Aucune</p><p>Dégats de l'arme : 10</p></div>")
    $("#ui-player2").append("<div class='info-player'><h2>"+ players[1].name +"</h2><p>Point de vie : "+ players[1].hp +"</p><p>Défense : "+ players[1].defense +"</p><button id='defense-1' class='btn btn-outline-success defense'>Défense</button><p>Arme en main : Aucune</p><p>Dégats de l'arme : 10</p></div>")
  });
  $(".carousel").carousel('pause')
  $(document).keypress(function (i) {
    if ((i.which == 13 || i.which == 32) && game == false) {
      $("#new-game").click();
      game = true
    }
  });
});