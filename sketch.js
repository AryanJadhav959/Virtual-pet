//Create variables here
var dog,dogHappy;
var foodS,foodStock
var database;
function preload()
{
  //load images here
  dog = loadImage('Dog.png');
  dogHappy = loadImage('happydog.png');
}

function setup() {
	createCanvas(500, 500);
  doggy = createSprite(250,250,10,10);
  doggy.addImage(dog);
  doggy.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    doggy.addImage(dogHappy);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill(0);
  stroke(2);
  text("Note : Press up_arrow to feed milk to Max",50,50);
  text("Food Remaining :" + foodS ,150 ,100 );
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0 ; 
  }
  else
  {
    x = x - 1;
  }
  database.ref('/').update({
    Food : x 
  })
}