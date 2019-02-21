class Door{

  constructor(x){
    this.x = x;
    this.color = 55;
    this.tag = 'Door';
    this.removed = false;
  }

  draw(){
    stroke(255);
    fill(this.color);
    rect(this.x , 100, 200, 324);

    if(this.removed == true){
      stroke(240,0,0);
      strokeWeight(15)
      line(this.x, 100, this.x+200, 424);
      line(this.x+200, 100, this.x, 424);
      strokeWeight(1)
      stroke(255)
    }

    fill(255);
    strokeWeight(1);
    textSize(32);
    textAlign(CENTER,CENTER);
    text(this.tag,this.x+100,150)

    if(this.tag == "Car"){
      textSize(128);
      stroke(255)
      strokeWeight(0)
      text("🚗",this.x+100,300)
    }else{
      textSize(32);
      stroke(255)
      strokeWeight(0)
      text("🐐",this.x+100,320)
    }
  }

  highlight(){
    if(this.color == 55){
      this.color = color(77,182,172);
    }else{
      this.color = 55;
    }
  }

  deselect(){
    this.color = 55;
  }
}

let door1 = new Door(100)
let door2 = new Door(400)
let door3 = new Door(700)
let doors = [door1,door2,door3];

function setup() {
  fill(55);
  createCanvas(1000, 800);
  keyReleased();

  button = createButton('100 Simulations');
  button.position(450, 650);
  button.size(100,100);
  button.mousePressed(oneHundredSims);
}

function oneHundredSims(){
  for(let i =0; i<100;i++){
    keyReleased();
  }
}

function touchStarted(){
  keyReleased();
}

function keyReleased() {
  pickRandom();
  removeGoat();
  for(let i of doors){
    if(i.color != 55){
      if(i.tag == "Car"){
        scoreStay++;
        winner = "Stay wins!";
      }else{
        scoreSwap++;
        winner = "Swap wins!";
      }
    }
  }
}

function removeGoat(){
  let unselected = [];
  for(let i =0; i <3;i++){
    if((doors[i].color == 55)&&(doors[i].tag == 'Goat')){
      unselected.push(i);
    }
  }
  doors[random(unselected)].removed = true;
}

let scoreStay = 0;
let scoreSwap = 0;
let winner = "";

function draw(){
  background(240);
  for(let i of doors){
    i.draw();
  }
  fill(0);
  strokeWeight(1);
  textSize(64);
  textAlign(CENTER, CENTER);
  winner=="Stay wins!"?fill(77,182,172):fill(255,152,0);
  text(winner,500,500);
  textSize(32);
  if((scoreStay+scoreSwap)>0){
    fill(77,182,172);
    text("Stay: " + parseFloat(100*scoreStay/(scoreStay+scoreSwap)).toFixed(2) + "%",300,600);
    fill(255,152,0);
    text("Swap: " + parseFloat(100*scoreSwap/(scoreStay+scoreSwap)).toFixed(2) + "%",700,600);
  }
}

function pickRandom(){
  for(let i of doors){
    i.deselect();
    i.tag = 'Goat';
    i.removed = false;
  }
  random(doors).highlight();
  random(doors).tag = 'Car';
}