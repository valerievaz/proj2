

let clockDiameter;
let capture;
let temperature = 0;
let weather = "";
let cx, cy;
let seconds;
let minutes;
let hours;
let json;
var itemInput;
var button;
let img;
let radius;
let lightsEnable = false;

var url2 = "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=OvOtoti6bxpfio1IbYNchXwSamhB8pjE";

function preload() {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=Lubbock&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  json = loadJSON(url);
  

}

function setup() {
  var canvas1 = createCanvas(700,500);
 // createCanvas(700, 500);
  stroke(255);
  loadJSON(url2, gotData);
  img = loadImage('download.png');
  img2 = loadImage('images.png');
  img3 = loadImage('IMG_4376.jpg');
  img4 = loadImage('IMG_4377.jpg');

  // used from Jakes given functions 
  temperature = json.main.temp;
  weather = json.weather[0].description;
  
  // to do list 
  itemInput = createInput('TO DO List');
  itemInput.position(10,420);
  
  button = createButton('Add a task');
  button.position(150,420);
  button.mousePressed(addItem);
  
  
  capture = createCapture(VIDEO);
  capture.size(700, 500);
  capture.hide();

  radius = min(100) / 2;
  seconds = radius * 0.71;
  minutes = radius * 0.6;
  hours = radius * 0.7;
  clockDiameter = radius * 1.5;
  cx = 350;
  cy = 50;
}


function gotData(data){
  //var c2 = createCanvas(10,10);
  // tried to use same style of formatting as jakes examples but i couldnt display it
  // i found this example style instead
  var articles = (data.results);
  var i;
  
  for (i = 0; i < 3; i++){
    createElement('h1',articles[i].title);
    createP(articles[i].abstract);
  }
  print(data.results[0].title);

}


function draw() {
  background(230);

  image(capture, 0, 0, 700, 500);
  image(img,500,10,200,70);
 // image(img2,550,455,45,45);
  
 text("Steps Today: 958", 510, 350);

  image(img3, 559,355, 140, 160);
  image(img4, 420, 355, 140, 140);

  fill(0);
  text("City:Lubbock", 450, 109);
  text("Current temp:" + temperature, 450, 130);
  text("Forecast:" + weather, 450, 150);
  

//the clock background
 noStroke();
 fill(4, 282, 188);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

//hands of the clock
  
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * seconds, cy + sin(s) * seconds);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutes, cy + sin(m) * minutes);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hours, cy + sin(h) * hours);

// Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * seconds;
    let y = cy + sin(angle) * seconds;
    vertex(x, y);
    
// the time at the left corner 
  var Year = year();
  var Month = month();
  var Day = day();
  var Hour = hour();
  var Minute = minute();
  var Second = second();
  
  var Date = Month + '-' + nf(Day, 2) + '-' + nf(Year, 2);
  var Time = Hour + ':' + nf(Minute, 2) + ':' + nf(Second, 2);
  fill(45);
  noStroke();
  textSize(22);
  
  text(Date, 10, 40);
  text(Time, 10, 70);
  }
  endShape();
}

// todo list
function addItem() {

  var list = createElement('li', itemInput.value());
  list.position(10,440);

  
  // submitting at the bottom below api i couldnt format it right

  
}




