var ghost, backgroundImage, trex, trex_animated, cone, ground;
var bg, conesGroup, gameOver, endTrex;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    backgroundImage = loadImage ("Add-ons/background.jpg");
    spookySound = loadSound ("Add-ons/spooky.wav");
    trex_animated = loadAnimation ("Add-ons/trex1.png", "Add-ons/trex3.png", "Add-ons/trex4.png");
    coneImg = loadImage ("Add-ons/obstacle1.png");
    gameOver = loadImage ("Add-ons/gameOver.png");
    endTrex = loadImage ("Add-ons/scaredTrex.png");
}

function setup() {
    createCanvas (600,600);
    spookySound.loop ();

    bg = createSprite (300,300);
    bg.addImage ("bgGround", backgroundImage);

    ground = createSprite (600,530,1200,140);
    ground.shapeColor = ("green")

    trex = createSprite (100,450,10,10);
    trex.addAnimation ("trexImg", trex_animated);

    conesGroup = createGroup();

    gameOver = createSprite (200,200);

    score = 0;
}



function draw() {
    background ("red");

    text ("Score: "+ score, 500,50);

    if (gameState === PLAY) {

    bg.velocityX = -3

    if (keyDown("space")){
        trex.velocityY = -15
    }

    trex.velocityY = trex.velocityY + 0.8

    if (bg.x <0){
        bg.x = bg.width/8
    }

    score = score + Math.round (getFrameRate()/60); 

    gameOver.visible = false;

    trex.collide (ground);
    
    if (conesGroup.isTouching(trex)){
        gameState = END;
        trex.changeAnimation (endTrex);
    }

    spawnCones();

}

    else if (gameState === END){
        trex.visible = false;
        conesGroup.visible = false;
        gameOver.visible = true;

        bg.velocityX = 0;
        ground.velocityX = 0;

        conesGroup.setLifetimeEach(-1);
        conesGroup.setVelocityEach(0);
    }

    drawSprites();
}

function spawnCones() {
    if (frameCount%150 ===0){
        cone = createSprite (600,450,15,10);
        cone.addImage (coneImg)
        cone.scale = 0.2
        cone.lifetime = 200
        cone.velocityX = -3

        conesGroup.add(cone);
    }
}