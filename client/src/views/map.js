var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');
var InteractionUI = require('./interactionUI.js');
var Player = require('../models/player_model.js');
var Bar = require('../models/bar_model.js');
var Item = require('../models/item_model.js');

var Map = function () {
  this.player = new Player({name: "Player1", wallet: 100});
  this.bar = new Bar({name: "Chanter", cashDrawer: 1000});
  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);
  this.statsUI = new StatsUI(this.player, this.bar);

  context = getPlayerCanvasContext();
  mainContext = getMainCanvasContext();
  
  context.beginPath();
  context.moveTo(90,90);
  currentPosition = [90,90];
  window.addEventListener('keydown', movePlayer);

  window.addEventListener('keydown', placeOrder);

  // testing adding item
  // window.addEventListener('keydown', addItem);
  var testItem = new Item({name: "Amstel", value: 4})

  // this.game.addDrinkToPlayer(testItem, function (response) {
  //   console.log('addDrinkToPlayer response data', response)
  // })
  // this.game.removeDrinkFromPlayer(testItem, function (response) {
  //   console.log('removeDrinkFromPlayer response data', response)
  // })

  loadCanvas();
//////////////to test coords
  var canvas = document.getElementById("player-canvas");

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
      }, false);
};
//////////// delete after use

//testing adding item
var addItem = function(e){
  if (e.key === "a"){
    this.game.addDrinkToPlayer({name: "Amstel", value: 4});
    loadCanvas();
  };
}.bind(this); 

var placeOrder = function(e){
console.log(e)
  if (e.key === "o"){
    this.interactionUI = new InteractionUI(this.player, this.bar);

    var interactionArea = document.getElementById('middle');

    var yesButton = document.createElement('button');
    yesButton.innerHTML = "Yes";

    var noButton = document.createElement('button');
    noButton.innerHTML = "No";

    interactionArea.appendChild(yesButton);
    interactionArea.appendChild(noButton);

    yesClick = yesButton.addEventListener('click', orderPlaced);
    noClick = noButton.addEventListener('click', orderNotPlaced);
  };


}.bind(this);

var orderPlaced = function () {
  //DO SOON
}

var orderNotPlaced = function () {
  messageDisplay = document.getElementById("interaction-message");
  messageDisplay.innerHTML = "What a loser...";
}


var loadCanvas = function() {
  var backdrop = document.createElement('img');
  backdrop.src = "/public/img/edited_images/backdrop_empty.png";

  var tableSet = document.createElement('img');
  tableSet.src = "/public/img/edited_images/table_set.png";

  var sofaSetBottom = document.createElement('img');
  sofaSetBottom.src = "/public/img/edited_images/sofa_set.png";

  var sofaSetTop = document.createElement('img');
  sofaSetTop.src = "/public/img/edited_images/sofa_set.png";

  var bartender = document.createElement('img');
  bartender.src = "/public/img/edited_images/f1bartender.png";

  var stage = document.createElement('img');
  stage.src = "/public/img/edited_images/stage.png";

  var piano = document.createElement('img');
  piano.src = "/public/img/edited_images/piano.png";

  var mainGirl = document.createElement('img');
  mainGirl.src = "/public/img/edited_images/f1girl.png";

  var guy = document.createElement('img');
  guy.src = "/public/img/edited_images/f1guy.png";

  context = getPlayerCanvasContext();
  mainContext = getMainCanvasContext();

  backdrop.onload = function() {
    mainContext.drawImage(this, 0, 0, 700, 500); 
  };

  tableSet.onload = function() {
    context.drawImage(this, -200, 110, 700, 500);
  };

  sofaSetTop.onload = function() {
    context.drawImage(this, 200, -30, 700, 500);
  };

  sofaSetBottom.onload = function() {
    context.drawImage(this, 200, 140, 700, 500);
  };

  bartender.onload = function() {
    context.drawImage(this, -190, -40, 700, 500);
  };

  stage.onload = function() {
    context.drawImage(this, 254, -140, 700, 500);
  };

  piano.onload = function() {
    context.drawImage(this, 50, -160, 700, 500);
  };

  mainGirl.onload = function() {
    context.drawImage(this, 20, 180, 700, 500);
  };

  guy.onload = function() {
    context.drawImage(this, 100, -30, 700, 500);
  };
};

  // drawMap = function() {
  //   context.drawImage(backdrop, 0, 0, 700, 500);
  // };

var getMainCanvasContext = function(){
  var canvas = document.getElementById("main-canvas");
  var context = canvas.getContext("2d");
  return context;
}

var getPlayerCanvasContext = function(){
  var canvas = document.getElementById("player-canvas");
  var context = canvas.getContext("2d");
  return context;
}


var movePlayer = function(e){
  var context  = getMainCanvasContext();
  var positionX = currentPosition[0];
  var positionY = currentPosition[1];

  if (e.key === "ArrowRight"){
    // positionX += 5

    var hitRightBorder = positionX + 5 >= 710

    var hitLeftEdgeOfSquare = (positionX + 5 >= 180) && (positionY <= 180) || (positionX + 5 >= 180) && (positionY <= 360) 

    if (hitRightBorder){
      console.log('can\'t move')
    }
    else if(hitLeftEdgeOfSquare){
      console.log('can\'t move')
    }
    else {
      context.lineTo((positionX+5), positionY)
      context.stroke()
      currentPosition[0] = positionX+5
      console.log("Right")
    }
  }
  else if(e.key === "ArrowLeft"){
    if (positionX - 5 >= 90){
      context.lineTo((positionX-5), positionY)
      context.stroke()
      currentPosition[0] = positionX-5
      console.log("Left")
    }
  }
  else if(e.key === "ArrowUp"){
    // if (positionY - 5 >= 90){
      var hitTopBorder = positionX - 5 <= 0

      var hitBottomOfBar = (positionX <= 0) && (positionY - 5 <= 294) || (positionX <= 240) && (positionY - 5 <= 294) 

      if (hitTopBorder){
        console.log('can\'t move')
      }
      else if (hitBottomOfBar){
        console.log('can\'t move')
      }

      context.lineTo(positionX, (positionY-5))
      context.stroke()
      currentPosition[1] = positionY-5
      console.log("Up")
    }
  else if(e.key === "ArrowDown"){
    if (positionY + 5 <= 610){
      context.lineTo(positionX, (positionY+5))
      context.stroke()
      currentPosition[1] = positionY+5
      console.log("Down")
    }
  } 
  else { return; };

};


module.exports = Map;