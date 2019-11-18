// MS1 Project 3: Interactive w/ Met Dataset
let data;

// bring in approx 500 sliver images made from 30 paintings using jimp.js
// each sliver image is saved at 80px wide, 800 px tall
function preload() {
  data = loadJSON('sliversObjects.json');
}

// use 'visual' to link into css file
function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  // canvas.style('display', 'block');
  // canvas.parent('visual');
  background('black');
  displayImages(data);
}

// use random to select a random object from the json data, do this 14 times.
function displayImages(newData) {
  for (let i=0;i<14;i++){
    var randomInt = Math.floor(Math.random()*newData.length);
    loadSliver(i,newData[randomInt])
    newData.splice(randomInt,1)
  }
}

/* use p5 loadImage function to load the img_src from the json file and place 
each side by side and with a height in relation to the assigned horizon value.*/
function loadSliver(index, imageObject){
      loadImage(imageObject.img_src, sliver => {
      var x = (index+1)*45
      imgWidth = 60
      imgHeight = imgWidth*10
      image(sliver, 100+(index+1)*imgWidth, 530-((imageObject.horizon*imgWidth)*10), imgWidth,imgHeight);
    });
}



