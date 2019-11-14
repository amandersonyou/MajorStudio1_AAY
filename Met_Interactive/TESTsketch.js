// P5 display sliver images
let data;

let images = {};

function preload() {
  data = loadJSON('slivers.json');
}

function setup() {
  // width and height of the browser window
  
  data.forEach( (object)=>{
      images[object.id] = loadImage(object.img_src);
  });

  createCanvas(1200, 1000);
  displayImages();
}

x=0
y=400

// function displayImages() {
//     // for(var i =0; i<13; i++){
//     //     random = data[Math.floor(Math.random()*data.length-1)];
//     //     image = data[random].img_src;
//     //     image(x, (y-data.horizon*100))
//     //     x+80
//     // }
    
    
    
    
//     // data = [ object, object, object ]
    
    
//     // horizon 
//     // 
//     // 0.4        =   350
//     // 0.5        =   400
//     // 1.0
    
//     // standard * horizon = 400
//     // 800 * 0.5  = 400
    
//     data
//     .sort( ()=>Math.random() - 0.5 )
//     .forEach( (object,index) => {
//         p5image = images[object.id];
//         image( p5image, index*80, object.horizon*80 );
//     });
    
// }