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
  // var canvas = createCanvas(11250, 800);
  // canvas.style('display', 'block');
  // canvas.parent('visual');
  background('black');
  displayImages(data);
}

var randomItems = [];
var randomImages = [];


// use random to select a random object from the json data, do this 14 times.
function displayImages(newData) {
  for (let i=0;i<22;i++){
    var randomInt = Math.floor(Math.random()*newData.length);
    loadSliver(i,newData[randomInt])
    newData.splice(randomInt,1)
  }
}

/* use p5 loadImage function to load the img_src from the json file and place 
each side by side and with a height in relation to the assigned horizon value.*/
function loadSliver(index, imageObject){
      loadImage(imageObject.img_src, sliver => {
        randomImages.push(sliver);
        randomItems.push(imageObject);
    });
}

var urlForLink;
var openImage;



function draw() {
  for(i=0;i<randomItems.length;i++){
    
      var x = (i+1)*45
      imgWidth = 50
      imgHeight = imgWidth*10
      image(randomImages[i], 50+(i+1)*imgWidth, 400-((randomItems[i].horizon*imgWidth)*10), imgWidth,imgHeight);
      
      if (mouseX > (50+(i+1)*imgWidth) && mouseX < ((50+(i+1)*imgWidth)+imgWidth) && mouseY > (530+((randomItems[i].horizon*imgWidth)*10) && mouseY < (530+((randomItems[i].horizon*imgWidth)*10)-imgHeight))) {
        urlForLink = randomItems[i].met_url;
      }
  }
}

function mouseClicked() {
  window.open(urlForLink);
  location.reload();
}




// Displaying image to right of new landscape:
// function draw() {
//   for(i=0;i<randomItems.length;i++){
    
//       var x = (i+1)*45
//       imgWidth = 50
//       imgHeight = imgWidth*10
//       image(randomImages[i], 50+(i+1)*imgWidth, 400-((randomItems[i].horizon*imgWidth)*10), imgWidth,imgHeight);
      
//       if (mouseX > (50+(i+1)*imgWidth) && mouseX < ((50+(i+1)*imgWidth)+imgWidth) && mouseY > (530+((randomItems[i].horizon*imgWidth)*10) && mouseY < (530+((randomItems[i].horizon*imgWidth)*10)-imgHeight))) {
//         // urlForLink = randomItems[i].met_url;
//         img = loadImage(randomItems[i].full_painting);
//       }
//   }
// }


// function mouseClicked() {
//   image(img, 900, 100, img.width / 3, img.height / 3);
// }



