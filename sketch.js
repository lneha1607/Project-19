var forrestImg, forrest;
 var girlImg, girl;
 var manImg, man;
 var rockImg, rock, rocksGroup;
 var gameState = "play";
 var ground, invisibleground, groundImage;

 function preload(){
  forrestImg = loadImage("jungle.png");
  girlImg = loadImage("GIRL.png");
  manImg = loadImage("MAN.png");
  rockImg = loadImage("ROCK.png");
  groundImage = loadImage("GROUND2.png");
}
function setup() {
  createCanvas(600, 600)
   
  forrest = createSprite(300,300);
  forrest.addImage("forrest", forrestImg);
  forrest.x = forrest.width /2;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  invisibleGround = createSprite(270,580,400,10);
  invisibleGround.visible = false;

 girl=createSprite(350,450,80,120);
  girl.addImage("girl",girlImg);
  girl.scale=1;

   man=createSprite(100,470,550,503);
  man.addImage("man",manImg);
   man.scale=1.2;
    
    girl.setCollider("circle",0,0,90);
   girl.debug = false;
 
    rocksGroup = new Group();
  
    score=0;
}

function draw() {
  background(200);
 
  
  if(gameState==="play"){
    if(rocksGroup.isTouching(girl)){
       gameState=end;
    }
    forrest.velocityX=-2;

    if(keyDown("space")){
    girl.velocityY=-15; 
    }  
     girl.velocityY =  girl.velocityY + 0.8;

    if(rocksGroup.isTouching(girl)){
        forrest.velocityX=0;
    }
    if(forrest.x <200){
      forrest.x=forrest.width /2;
    }
     spawnRocks();
    drawSprites();
  }
   girl.collide(invisibleGround);

    if(gameState==="end"){
      if(rocksGroup.isTouching(girl)){
        stroke("orange");
        fill("orange");
        textSize(30);
        text("Game Over",400,250);
     }
     
   
    }
    
     drawSprites();
  spawnRocks();
    
}
function spawnRocks(){
  if(frameCount%250===0){
     rock=createSprite(450,550,90,10)
     rock.addImage(rockImg)
     rock.x=Math.round(random(550,450));
     rock.velocityX=-5;
    rock.lifetime=600;
    rock.scale=0.1;
     rocksGroup.add(rock);
      rock.depth =  girl.depth;
     girl.depth =  rock.depth + 1;
  }
}