// MS1 Project 3: Interactive w/ Met Dataset
// Amanda Anderson-You, Nov. 2019
// P5 display sliver images


let data;

// bring in approx 440 sliver images made from 30 paintings using jimp.js
// each sliver image is saved at 80px wide, 800 px tall
function preload() {
  data = loadJSON('sliversObjects.json');
}

// use 'visual' to link into css file
function setup() {
  var canvas = createCanvas(1200, 1000);
  // canvas.parent('visual');
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
      imgWidth = 50
      imgHeight = imgWidth*10
      image(sliver, 100+(index+1)*imgWidth, 400-((imageObject.horizon*imgWidth)*10), imgWidth,imgHeight);
      // image(sliver, (index+1)*imgWidth, 650-((imageObject.horizon*imgWidth)*10),imgWidth,imgHeight);
    });
}

// To Do:
// solve horizon height - jumping around as page reloads, can I keep the horizon at a steady level?
// keep longer slices from being cropped out
// on button click run displayImages function to refresh slivers
// determine final size of img width/height after layed out with css - verify parent above
// finalize total json file
// solve for duplicates, consider not having same painting side by side
