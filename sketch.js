var monkey;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var points = 0;
var lives = 3;
function preload(){
    groundImage = loadImage("ground.png");
    monkeyImage =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
    gameOverImage = loadAnimation("gameOver.png");
    eatSound = loadSound("eating.mp3");

    
}


function setup(){
    createCanvas(800,400);
    
    
    ground = createSprite(600,60,1600,10);
    ground.addImage("ground", groundImage);
    ground.scale = 1.55;

    monkey = createSprite(50,360,20,40);
    monkey.addAnimation("monkey", monkeyImage);
    monkey.addAnimation("gameOver", gameOverImage);
    monkey.scale = 0.15;

    invisibleGround = createSprite(400,380,800,10);
    invisibleGround.visible = false;
    bananaGroup = createGroup();
    obstacleGroup = createGroup();
    
}

function draw(){
    
    if (gameState === PLAY){
        background("lightblue");
        textSize(30);
        fill("black");
        text("Points : " + points, 200,40);

        text("Lives : " + lives, 400, 40);
        ground.velocityX = -3;
        if (ground.x < 0){
            ground.x = 400;
        }
        if(keyDown("space")){
            monkey.velocityY = -12;
        }
        monkey.velocityY = monkey.velocityY + 0.8;

        spawnBananas();
        spawnObstacles();
    
        for (i = 0; i < bananaGroup.length; i++){
            if(bananaGroup.get(i).isTouching(monkey)){
                bananaGroup.get(i).destroy();
                eatSound.play();
                points = points + 1;
                
            }
        }
        for (i = 0; i < obstacleGroup.length; i++){
            if(obstacleGroup.get(i).isTouching(monkey)){
                obstacleGroup.get(i).destroy();
                lives = lives - 1 ;
                
                if (lives === 0){
                    gameState = END;
                }
            }
        }

        if (gameState === END){
            background("black");
            endGame();
        }



    } 

    monkey.collide(invisibleGround);
    drawSprites();
}

function endGame(){
    
    ground.velocityX = 0;
    ground.destroy();
    monkey.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(100);
    fill("red");
    text("GAME OVER", 100,200);

}

function spawnBananas() {
    if(frameCount % 80 === 0){
        banana = createSprite(800,200,30,20);
        banana.velocityX = -4;
        banana.y = Math.round(random(120,350));
        banana.addImage("banana", bananaImage);
        banana.scale = 0.1;
        banana.lifetime = 200;
        bananaGroup.add(banana);
        


    }
}

function spawnObstacles() {
    if(frameCount % 300 === 0){
        obstacle = createSprite(800,360,30,20);
        obstacle.velocityX = -6;
        obstacle.addImage("obstacle", obstacleImage);
        obstacle.scale = 0.1;
        obstacleGroup.add(obstacle);
        obstacle.lifetime = 150;


    }
}
