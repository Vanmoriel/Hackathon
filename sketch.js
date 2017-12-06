var mic;
var dot = [];
var count = 0;
var vol, mVol,myImg;

function preload() {
  myImg = loadImage("./assets/Alberello.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  mic.start();

}

function draw() {
  background(12, 39, 65);

  //Volume between 0 and 1
  vol = mic.getLevel();
 
  //mapping for velocity
  mVol = map(vol*200, 0, 1, 1, 5);
  
  //Mapping for lamps
  var lVol=map(vol,0,1,3,20);
  var range =0;
  
  //resize without stretching the image
  if (width > height){
    range = height;
  } else {
    range = width;
  }
  
  
  
  push();
  translate(0,-lVol);
  imageMode(CENTER);
  image(myImg, width/2, height/2,range/2,range/2);
  fill(lerpColor(color('#ffff4d'), color('#ff751a'), vol));
  ellipse(width/2.1,height/2.5,lVol);
  ellipse(width/1.9,height/1.5,lVol);
  ellipse(width/1.8,height/1.7,lVol);
  ellipse(width/1.9,height/2.3,lVol);
  ellipse(width/2.2,height/1.4,lVol);
  ellipse(width/2.3,height/1.7,lVol);
  ellipse(width/2,height/1.9,lVol);
  fill(255, 255, 102,40);
  ellipse(width/2,height/3.4,mVol);

  pop(); 
  
  //Snow Time!
  
	for (i=0; i< count; i++){
		dot[i].display();
		dot[i].move();
		}
	if (vol<=0.2 && count <= 1000){
		dot[count] = new Snow();
		count++;
		}	
			
	//reset the snow to avoid overload
	if (count == 1000) {
		count = 0;
		}	
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//Modified from letItSnow.P5
function Snow(){
	this.x =random(windowWidth);
	this.y = 0;
	this.diameter = random(2, 10);
	this.speed = mVol;
				
	this.move = function(){
					
					// Floor detection
					if(this.y + this.diameter/2 < windowHeight)
					{
						this.y += this.speed;
					}
				}
				
				this.display = function(){
					noStroke();
					fill(255);
					ellipse(this.x, this.y, this.diameter, this.diameter);
				}
			}
			
function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}
