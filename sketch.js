var gameState = "play";



var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;

function preload(){
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  doorGroup = new Group();
  
  climberImage = loadImage("climber.png");
  climberGroup = new Group();
  
  ghostImage = loadImage("ghost-standing.png");
  
  invisibleBlockGroup = new Group();
}


function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 10, 10);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
}


function draw(){
  if(gameState === "play"){
    
        if(tower.y > 400){
      tower.y = 200;
    }
    
    if(keyDown("left_arrow")){
  ghost.x = ghost.x - 3;
}

if(keyDown("right_arrow")){
  ghost.x = ghost.x + 3;
}
if(keyDown("space")){
  ghost.velocityY = -8;
}
  ghost.velocityY = ghost.velocityY+0.6;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || (ghost.y > 600)){
    ghost.destroy();
    gameState = "end";
  }
    
      spawnDoors();
  }
  drawSprites();
  if(gameState === "end"){

    tower.velocityY = 0;
     doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    
        stroke("white");
    fill("white");
    textSize(30);
    text("GAME OVER!", 200, 300);
    
  }
  console.log(gameState);
  
}


function spawnDoors(){
  
  if(frameCount%250 === 0){
  door = createSprite(300, -50);
  door.x = Math.round(random(100, 400));
  door.addImage(doorImage);
  door.velocityY = 1;
  door.lifetime = 650;
  doorGroup.add(door);
  door.depth = ghost.depth - 1;
  
  climber = createSprite(door.x, 10);
  climber.addImage(climberImage);
  climber.velocityY = 1;
  climber.lifetime = 650;
  climberGroup.add(climber);
  climber.depth = ghost.depth - 1;
    
  invisibleBlock = createSprite(door.x, 15);
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 650;
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  //invisibleBlock.debug = true;
  invisibleBlock.visible = false; 
  invisibleBlockGroup.add(invisibleBlock);

  
}



}