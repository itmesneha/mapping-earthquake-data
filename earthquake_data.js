var button1;
var button2;
var button3;
var button4;
var button5;
var earthquakes;
var earthquake_data;
var clon = 0;
var clat = 0;
var zoom = 1;
function preload()
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic25zMzkxOTk4IiwiYSI6ImNqdjExaGNnbjBsbGE0M25iMTI5ZjlpaTEifQ.91dR3qJ2Zf83R55j3LqipA');
}
function setup() {
  var cnv = createCanvas(1024,512);
  cnv.position(100,100);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  button1 = select('#past_day');
  //button1 = createButton("Past Day");
  button1.mousePressed(past_day);
  //button2 = createButton("Past Hour");
  button2 = select('#past_hour');
  button2.mousePressed(past_hour);
  //button3 = createButton("Past Week");
  button3 = select('#past_week');
  button3.mousePressed(past_week);
  //button4 = createButton("Past Month");
  button4 = select('#past_month');
  button4.mousePressed(past_month);
  //button5 = createButton("Clear");
  button5 = select('#clear');
  button5.mousePressed(clearEverything);


}
function mercX(lon)
{
  lon = radians(lon);
  var a = (256/PI) * pow(2,zoom);
  var b = lon + PI;
  return a*b;
}

function mercY(lat)
{
  lat = radians(lat);
  var a = (256/PI) * pow(2,zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a*c;
}


function fill_map() {
  var cx = mercX(clon);
  var cy = mercY(clat);
    for(var i = 0; i < earthquake_data.length; i++)
    {

      var data = earthquake_data[i].split(/,/);
      var lat = data[1];
      var lon = data[2];
      var mag = data[4];
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;

      mag = pow(10,mag);
      mag = sqrt(mag);

      var magmax = sqrt(pow(10,10));

      var d = map(mag, 0, magmax, 0, 180);
      if(d<0.01)
        d = d*10;
      stroke(255,0,255);
      fill(255,0,255,200);
      ellipse(x,y,d,d);
    }
}

function getStrings(earthquakes)
{
  earthquake_data = earthquakes;
  fill_map();
}

function past_day()
{
  createCanvas(1024,512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv',getStrings);
}

function past_hour() {
  createCanvas(1024,512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv',getStrings);
}

function past_week()
{
  createCanvas(1024,512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv',getStrings);
}

function past_month()
{
  createCanvas(1024,512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv',getStrings);
}


function clearEverything() {
  background(50);
}
