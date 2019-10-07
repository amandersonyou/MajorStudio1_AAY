/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

// object Ids I want to download
const myObjectIds = [
  10768,
10769,
10788,
10793,
10496,
10497,
10500,
10501,
11619,
18354,
10381,
18447,
12800,
11170,
11310,
11315,
12630,
10578,
10945,
10946,
10481,
11007,
10149,
10150,
10151,
10154,
10158,
17574,
13058,
13357,
14480,
11598,
11600,
11290,
12786,
10131,
10649,
12765,
11692,
19300,
19334,
11431,
17803,
11982,
11659,
19291,
19258,
12902
];


// set up empty Array for us to save results to
const myArray = [];

function fetchUrl(objectId){
    request(url + '/' + objectId, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      let obj = JSON.parse(body);

      console.log(obj.primaryImage);
      let index = myArray.length;
      myArray[index] = {};
      myArray[index]["objectID"] = obj.objectID;
      myArray[index]["title"] = obj.title;
      myArray[index]["date"] = obj.objectBeginDate;
      myArray[index]["primaryImage"] = obj.primaryImage;
      myArray[index]["filename"] = obj.primaryImage.split('/').pop();
    });
}

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId)
})

// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./AMERdata.json', JSON.stringify(myArray), 'utf8')
}, 2000)
