//Create variables here
var doggo, dog, happy, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj, epic;
var list1 = [];
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  doggo = createSprite(120,200,10,10);
  doggo.addImage(dog);
  doggo.scale = 0.25;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  feed = createButton("Feed your Dog");
  feed.position(640,95);
  feed.mousePressed(feedDog);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  }); 
  addFood = createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);
  foodObj = new Food(foodS,lastFed);
}


function draw() {  
  background(30,30,30);
  fill("white");
  textSize(16);
  text("Remaining meals left: " + foodS,20,60);
  //add styles here
  drawSprites();
  if(lastFed >= 12){
    text("Last Fed at " + lastFed%12 + " PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Fed at 12 AM",350,30);
  }
  else{
    text("Last Fed at " + lastFed + " AM");
  }
  foodObj.display();
}
 
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x -= 1;
  }
  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  doggo.addImage(happy);
  console.log(foodS);
  foodS -= 1;
  foodObj.updateFood(foodS);
  list1[0] -= 1;
  database.ref('/').update({
    food : foodS,
    FeedTime : hour()
  })
  //console.log(foodObj.getFood());
}
function addFoods(){
  foodS ++;
  database.ref('/').update({
    food : foodS
  })
  list1[0] += 1;
}




