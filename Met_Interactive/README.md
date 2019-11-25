# Met Interactive Project

For the third project of Major Studio 1, I am again working with the the landscape 
data from the Met API. I have evolved an earlier concept from the qualitative project 
and made a visualization that creates new landscapes out of slices of landscape paintings 
from the Met's collection. The slices are randomly ordered, and aligned at their horizon 
lines for a unique, collaged curation.

The goal of this visualization is to allow for artistic exploration and to encourage the 
viewer to see the landscape paintings in a new way. The slices bring your attention to 
small details that get lost in the full artwork, but stand out when juxtaposed next to 
other related, but different artworks. 

My process begins with determining my dataset. I pulled images from the Met API that 
had the medium of painting, and the keyword of landscape. Of the hundreds of results, 
thirty paintings had open access downloadable art. I then adjusted the size of the images 
to have a consistent height, and used an image manipulation javascript library called 
jimp.js to create slices of each image at a consistent width. Once sliced, I ended up 
with approximately 500 individual image files.

jimp.js code example:

```
var Jimp = require('jimp');

Jimp.read('landscapePaintings/459099_landscapeWithCattleatLimousin.jpg')
  .then(land => {
    return land
      .crop(1600, 0, 100, 1000)
      .quality(60) // set JPEG quality
      // .write('crops/16_459099_landscapeWithCattleatLimousin.jpg'); // save
  })
  .catch(err => {
    console.error(err);
  });
```

I created a comprehensive JSON file containing each image slice's link, the manually 
determined horizon level for each slice (valued between 0 and 1), the url link to the 
full painting on the Met website, and the painting's name.

```
    {
        "name": "The Village of La Celle-sous-Moret",
        "img_src":"https://raw.githubusercontent.com/amandersonyou/MajorStudio1_AAY/master/Met_Interactive/crops800/4_436849_theVillageofLaCellesousMoret.jpg",
        "horizon": 0.5,
        "met_url": "https://www.metmuseum.org/art/collection/search/436849"
    },
    {
        "name": "The Village of La Celle-sous-Moret",
        "img_src":"https://raw.githubusercontent.com/amandersonyou/MajorStudio1_AAY/master/Met_Interactive/crops800/5_436849_theVillageofLaCellesousMoret.jpg",
        "horizon": 0.6,
        "met_url": "https://www.metmuseum.org/art/collection/search/436849"
    },
```

I used p5.js to write functions that loop through all of the json objects, selecting 14 
random slices to assemble into a new landscape. The y position of the slices is influenced 
by the horizon value to have each slice line up and create a relatively flat horizon 
across the image. Each time the page is refreshed, the generated landscape changes. 
By creating a "newData" array, I avoid duplicate slices within the same landscape, however 
I intentionally allow slices from the same painting to appear within the new image. 
Using mouse position, when the user clicks on each slice, they are taken to the Met 
website for that particular painting to see the full view and how the slice fits into the whole.

![example output](Sketches/exampleOutput.png "example output")

Overall, this visualization doesn't attempt to communicate a fact or a specific observation, 
but instead allows for a new perspective and further interactive exploration into the 
landscape paintings at the Met.


