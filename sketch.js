var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana_img,bananaGroup;
var obstacleGroup,obstacleImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(bananaGroup.isTouching(player)){
      bananaGroup[0].destroy();
      score = score + 2;
      player.scale += 0.1;
    }

    spawnFood();
    spawnObstacle();
  }

  drawSprites();

  textSize(25);
  fill("white");
  text("Score : "+score,600,100);
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);
    banana.addImage(banana_img);
    banana.scale = 0.1;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(800,320,40,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}