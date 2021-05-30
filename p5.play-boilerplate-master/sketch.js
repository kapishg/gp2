const World=Matter.World
const Engine=Matter.Engine
const Bodies=Matter.Bodies
var Kid,kid,tree1,road,car1,house1,gamestate=0
var life=5
var hearts=[]
var res
function preload(){
  road=loadImage("straight road.png")
  //tree=loadImage("trees.png")
  kid =loadImage("kid.png")
  car1=loadImage("car_1.png")
  house1=loadImage("house1.png")
  heart=loadImage("heart.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  //Kid=createSprite(displayWidth/4,displayHeight/2+200, 50, 50);
 // Kid.addImage(kid)
 // Kid.scale=0.5
 
 var xpos=width/9
 for(var heartss=0;heartss<5;heartss++){
   hearts[heartss]=createSprite(xpos,height/8,10,10)
 xpos+=50
 hearts[heartss].addImage(heart)
 hearts[heartss].scale=0.2  
}

engine=Engine.create()
world=engine.world

  tree1= new Tree(width,height/2,600,600)
  //tree1.addImage(tree)
  kid=new boy(displayWidth/2,displayHeight/2+200, 70, 70)
  ground=new Ground(displayWidth/2,displayHeight-100,displayWidth,50)
  sling=new SlingShot(kid.body,{x:width/2,y:height/2+200})
}




function draw() {
  background(road); 
  Engine.update(engine)
 
  sling.display()
if(kid.body.position.x>=width-330&&kid.body.position.y<=height/2+200&&kid.body.position.y>height/4
){
  Matter.Body.setStatic(kid.body,true)
}
//if(tree1.body.position.x-kid.body.position.x==300){
 // Matter.Body.setStatic(kid.body,true)}
  //ground.display()
  drawSprites();
tree1.display()
  kid.display ()
  textSize(20)
  text("Press spacebar to regenerate your charcter",width/2,height/7)
  
  if(life==0){
    gamestate= 2
  }
  if(gamestate==2){
    res=createSprite(width/2,height/4)
  }
}



function keyPressed(){
if(keyCode==32&&gamestate==1){
  Matter.Body.setPosition(kid.body,{
    x:displayWidth/2,y:displayHeight/2+200
  })
  sling.attach(kid.body)
  gamestate=0
  life--
  if (life>=0){
    hearts[life].destroy()
  }
}
}


function mouseDragged(){
  if(gamestate==0){
  Matter.Body.setPosition(kid.body,{
    x:mouseX,y:mouseY
   
  })
}
}
function mouseReleased(){
  gamestate=1
  sling.fly()
  //Matter.Body.applyForce(kid.body,kid.body.position,
    //x:+100,
    //y:-50
  //)
}
