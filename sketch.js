var database; 
var dog,dogHappy,dogImage; 
var foodStock,foodS; 
var feed,add,milkImg; 
var fedTime,lastfed,lf; 
var foodObj,feedDog; 

function preload() { 
  dogImage = loadImage("images/Dog.png"); 
  dogHappy = loadImage("images/happydog.png"); 
  milkImg = loadImage("images/Milk.png"); 
} 

function setup() { 
  database = firebase.database(); 
  
  createCanvas(1000, 500); 
  foodObj = new Food(); 
  dog = createSprite(800, 250); 
  dog.addImage("main", dogImage);
  dog.scale = 0.15; 
  
  foodStock = database.ref("food"); 
  foodStock.on("value", readStock); 
} 

function draw() { 
  background(49, 139, 87); 
  feed = createButton('feed the dog'); 
  feed.position(850, 180); 
  feed.mousePressed(feedDog)

  
  add = createButton('add food'); 
  add.position(950, 180); 
  add.mousePressed(addFood)
 


drawSprites(); 

textSize(20); 
stroke(25); 
fill(0, 0, 0); 
text("Note : Press the buttons to feed the dog !!", 50, 30); 

if (foodS !== undefined) { 
  text("Milk bottles left:" + foodS, 550, 30); 
  foodObj.display(); } 
  
  if (lastfed !== undefined) { 
    if (lastfed >= 12) { lf = lastfed % 12; 
      if (lf == 0) { lf = 12 } 
        text("Last feed " + lf + " PM", 750, 30); } 
        
  else if (lastfed == 0) { 
    text("Last feed 12 AM", 750, 30); 
  }
  else 
  { 
    text("Last feed : " + lastfed + " AM", 750, 13); 
  } 
 } 
} 

function showError() { 
  console.log("Error in writing through the database !!"); 
}

function feedDog(){
  
    if(foodObj.getFoodStock()<=0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
    }else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
    }
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      feedTime:hour()
    })
    dog.addImage(dogHappy); 
}

function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}