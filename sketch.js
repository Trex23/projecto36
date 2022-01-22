var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//crea aquí las variables feed y lastFed
var feed;
var lastFed; 

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  feed=createButton("Alimenta al perro");
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  
 
  //escribe el código para mostrar el texto lastFed time aquí
  textSize(20);
  fill("white");
  if(lastFed>=12){
    text("Última hora en que se alimentó: "+ lastFed + " PM", 70, 30);
  }else if(lastFed==0){
    text("Última hora en que se alimentó: 12 AM", 70,30);
  }else if(lastFed <12){
    text("Última hora en que se alimentó: "+ lastFed + " AM", 70, 30);
  }
 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  var food_stock_val =foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  //actualizar Food en base de datos
  foodS--;
  database.ref("/").update({
    Food:foodS
  })
  //actualizar feedtime
  lastFed= hour();
  database.ref("/").update({
    FeedTime:lastFed
  })
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
