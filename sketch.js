var balloon,height;
var database;
var bgImg;
function preload(){
    bgImg = loadImage("cityImage.png");
    balloon1 = loadAnimation("hotairballoon1.png");
    balloon2 = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
}


function setup(){
    createCanvas(windowWidth,windowHeight);
    database=firebase.database();
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("balloon1",balloon1);
    balloon.addAnimation("balloon2",balloon2);

    //create balloon sprite , load animation , add animation
    //scale - if required , refer database
    var balloonPosition = database.ref('balloon/height');
    balloonPosition.on('value',readHeight);
}

function draw(){
    background(bgImg);
    
    

    if(keyDown(UP_ARROW)){
        updateHeight(0,-10);
        balloon.changeAnimation("balloon2",balloon2);

        balloon.scale = balloon.scale - 0.01;
    }

    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,10);
        balloon.changeAnimation("balloon2",balloon2);
        balloon.scale = balloon.scale + 0.01;
    }

    else if(keyDown(RIGHT_ARROW)){
        updateHeight(10,0);
        balloon.changeAnimation("balloon2",balloon2);
        
    }

    else if(keyDown(LEFT_ARROW)){
        updateHeight(-10,-10);
        balloon.changeAnimation("balloon2",balloon2);
        
    }
    drawSprites();
}




function updateHeight(x,y){
    database.ref('balloon/height').set({
        'x' : height.x + x,
        'y' : height.y + y
    })
}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
}

