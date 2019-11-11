// P5 display sliver images
let data;


function preload() {
  data = loadJSON('slivers.json');
  //data = JSON.parse(data);
}

function setup() {
  var canvas = createCanvas(1200, 1000);
  canvas.parent('visual');
  displayImages();
}

function displayImages() {
  for (let i=0;i<5;i++){
    randomInt = Math.floor(Math.random()*data.length)
    loadSliver(i,data[randomInt])
  }
}

function loadSliver(index, imageObject){
      loadImage(imageObject.img_src, sliver => {
      var x = (index+1)*80
      imgWidth = 50
      imgHeight = imgWidth*10
      image(sliver, (index+1)*imgWidth, 400-((imageObject.horizon*imgWidth)*10),imgWidth,imgHeight);
    });
}

// on button click run displayImages function
