var PLAY=1;
var END=0;
var gamestate;
var monkey , monkey_running,monkeyfall;
var banana,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gameover,gameoverImage;
function preload(){
  
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyfall = loadImage("monkeyfall.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameoverImage = loadImage("gameover.png");
}
function setup() {
   createCanvas(600,200);
   monkey = createSprite(50,140,20,50);
  monkey.addAnimation("jumping",monkey_running);
  monkey.scale =0.1;
  monkey.addAnimation("fall",monkeyfall);

    ground = createSprite(600,180,1200,20);
    // ground.x = ground.width /2;
FoodGroup=createGroup();
  obstacleGroup=createGroup();

monkey.setCollider("circle",70,150,120)
monkey.debug = true;
gameover=createSprite(290,120,50,50);
gameover.addImage(gameoverImage);
  gameover.scale=0.4;
   gameover.visible=false;
start = createButton("START");
start.position(260,70);
start.style("color:yellow")
start.style('background-color','red');
    score = 0;
 
}

function draw() {
background("lightblue");
  stroke("red");
  textSize(15);
  fill("red");
   text("surival time: "+ score, 420,20);
   start.mousePressed(play);
  console.log( monkey.velocityY);
  ground.velocityX = -4;
  if(ground.x<0){
    ground.x=600/2;
  }
  if(gamestate==PLAY){
    console.log("play");
   start.hide();
    monkey.changeAnimation("jumping",monkey_running);
       score = score + Math.round(setFrameRate()/60);
monkey.collide(ground);
   if(keyDown("space")&& monkey.y >=100) {
     monkey.velocityY = -13 ;
     console.log("hello");
  }
        monkey.velocityY=monkey.velocityY+0.8;
    callBanana();
    if(FoodGroup.isTouching(monkey)){
FoodGroup.destroyEach();
 }
    
Rocks();
  }
  if(obstacleGroup.isTouching(monkey)){
    monkey.changeAnimation("fall",monkeyfall);
  
  obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    console.log("END"); 
     gamestate = END;
} 
  
  
  if (gamestate==END){
   
    start.visible = true;
     gameover.visible=true;
      monkey.velocityY = 0;
    FoodGroup.destroyEach();
     obstacleGroup.setVelocityXEach(0);
    //obstacleGroup.destroyEach();
     FoodGroup.setVelocityXEach(0); 
    start.show();
   
  }
   
  
  drawSprites();
  
}
 

function callBanana(){
  var rand2 = Math.round(random(50,100))
 if(frameCount%rand2==0){
  banana = createSprite(600,Math.round(random(20,50)),20,20);
 banana.velocityX =Math.round(random([-5,-4,-9,-7,-6,-5]));
   banana.lifeTime=150;
  banana.addImage(bananaImage);
  banana.scale =0.1;
      FoodGroup.add(banana);  
 }
  
  }

function Rocks(){

 if(frameCount%200==0){
 obstacle = createSprite(400,151,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacleGroup.add(obstacle);
 
 }
  
  }
function play(){
  gamestate=PLAY;
  score=0;
 start.visible=false;
     gameover.visible=false;
    obstacleGroup.destroyEach();
  }


