const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, bird2, bird3, bird4, slingshot;
var flyingSound;
var birds = [];
var getT;
var score = 0;

var gameState = "onSling";

function preload() {
    changeBackground();
    flyingSound = loadSound("flying.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150, 196);
    bird3 = new Bird(100, 196);
    bird4 = new Bird(50, 196);

    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);


    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){

    if(backgroundImg){
        background(backgroundImg);
    }


    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();    

    /* if(score > 0 && score % 195 == 0){
        die.play();
    }*/

    push();

    textSize(32);
    strokeWeight(3);
    fill(changeTextColour());
    text("SCORE: "+ score, 436, 50);
    
    pop();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length - 1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length - 1].body, birds[birds.length - 1].body.position, {x:5 , y:-5});
    }
}


function mouseReleased(){
    flyingSound.play();
    slingshot.fly();
    birds.pop();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        if(birds.length >= 0){
            Matter.Body.setPosition(birds[birds.length - 1].body, {x: 200, y: 50});
            slingshot.attach(birds[birds.length - 1].body);
            console.log(birds.length);
            bird4.trajectory = [];
            bird3.trajectory = [];
            bird2.trajectory = [];
            bird.trajectory = [];
            gameState = "onSling";
        }
    }
}

async function changeBackground(){
    var re = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var reJ = await re.json();
    var dt = reJ.datetime;
    var t = dt.slice(11,13);
    getT = t;

    if(t>6 && t<17){
        bg = "sprites/bg.png";
    } 
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}

function changeTextColour(){
    if (getT>6 && getT<17) {
        return 0;
    }
    else{
        return 255;
    }
}