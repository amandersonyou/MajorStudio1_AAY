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


