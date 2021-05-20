//Create variables here
var database;
var dog,happyDog,sadDog;
var foodObj;
var foodS,foodStock;
var fedTime,lastFed,feed;
var addFood;
var feedDog;
var bedroom,garden,washroom,livingroom;
var milkBottle2;
var writeStock;
var gameState;
var milk

function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  livingroom = loadImage("images/Living Room.png")
  milk = loadImage("images/Milk.png")

}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);

  foodObj = new Food();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
  milkBottle1 = createSprite(140,435,10,10);
  milkBottle1.addImage("m",milk);
  milkBottle1.scale = 0.025;
  
  milkBottle2 = createSprite(210,280,10,10);
  milkBottle2.addImage("a",milk);
  milkBottle2.scale = 0.025;
  milkBottle2.visible = false;
  
}


function draw() {  
  background(46, 139, 87);
  //add styles here
  
  foodObj.display();
  writeStock(foodS);
  
  if(foodS === 0){
    dog.addImage(happyDog);
    milkBottle2.visible = false;
  }
  else{
    dog.addImage(sadDog);
    milkBottle2.visible = true;
  }
  
  var readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  if(gameState === 1){
    dog.addImage(happyDog);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if(gameState === 2){
    dog.addImage(sadDog);
    dog.scale = 0.175;
    milkBottle2.visible = false;
    dog.y = 250;
  }

  var Bath = createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState':gameState})
  }))

  if(gameState === 3){
    dog.addImage(washroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var Sleep = createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({'gameState':gameState})

  }))

  if(gameState === 4){
    dog.addImage(bedroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  var Play = createButton("lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState = 5
    database.ref('/').update({'gameState':gameState})
  }))

  if(gameState === 5){
    dog.addImage(livingroom);
    dog.scale = 1;
    milkBottle2.visible = false
  }

  var PlayInGarden = createButton("lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({'gameState':gameState})
  }))

  if(gameState === 6){
    dog.addImage(garden);
    dog.scale = 1;
    milkBottle2.visible = false
  }

  drawSprites();
  
    fill(255,255,254);
    textSize(15);
    text("Milk Bottles Remaining  "+foodS,200,200);
}
    
function readStock(data){
  foodS = data.val();
  //foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })

}
