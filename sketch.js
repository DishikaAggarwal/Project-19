var background,jungleImage;
var monkey,monkeyImage;
var ground,invisibleground;
var banana,bananaImage;
var obstacle,obstacleImage;
var END=0;
var PLAY=1;
var gameState=PLAY;
var score=0;

function preload(){
jungleImage=loadImage("jungle.jpg");
bananaImage=loadImage("banana.png");
obstacleImage=loadImage("stone.png"); 
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

 function setup(){
createCanvas(600,400);
   
background=createSprite (300,200,600,400)
background.addImage(jungleImage);  
   
ground = createSprite(300, 350,600,5);
fill("black");

invisibleground=createSprite(300,358,600,5);
invisibleground.visible=false;
   
monkey = createSprite(100,340,20,50);
monkey.addAnimation("Running",monkeyImage);
monkey.scale = 0.1;  
   
bananagroup = new Group();
obstaclegroup = new Group();
 }

function draw(){

   if (gameState===PLAY) {
   
   //making monkey jump
    if (keyDown("UP_ARROW") ) {
      monkey.velocityY=-12;
         
    }
    
    //add gravity
    monkey.velocityY=monkey.velocityY+0.5;
    
    monkey.collide(invisibleground);
    
    textSize(20);
    fill("black"); 
    
    //making ground move
    if (ground.x<200) {
      ground.x = ground.width/2;
    }
    
     spawnobstacles(); 
     spawnbananas();
  
  //giving velocity to the ground     
    ground.velocityX=-4;
    
    //colliding trex to the ground
    monkey.collide(invisibleground);
     
    //adding score when monkey touches bananas
    if (bananagroup.isTouching(monkey)) {
      score=score+2;
      bananagroup.destroyEach();
      
    
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    } 
    if (obstaclegroup.isTouching(monkey)) {
      gameState=END;
        
      
    }
    
 } else if(gameState===END) {
    
      //giving fixed velocity to the sprited
      monkey.velocityY=0;
      obstaclegroup.setVelocityEach(0);
      bananagroup.setVelocityEach(0);
      ground.velocityX=0;
 }

 spawnobstacles(); 
 spawnbananas();
  
drawSprites();
  text("Score:" +score,100,50); 
}

//making obstacles
function spawnobstacles() {
  if (World.frameCount%300===0) {
    var obstacle = createSprite(580, 332);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-3;
    obstaclegroup.add(obstacle);
    
  }
  
}

//making functions
function spawnbananas() {
  if (World.frameCount%80===0) {
    var banana = createSprite(580, 230);
    Math.round(random(310,220));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-2;
    bananagroup.add(banana);
    bananagroup.setLifetimeEach(200);
    
  }

}
