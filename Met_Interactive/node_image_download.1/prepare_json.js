/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request');

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';

// object Ids I want to download
const myObjectIds = [
10151,
10152,
10154,
10178,
10180,
10181,
10183,
10195,
10196,
10207,
10215,
10235,
10258,
10377,
10435,
10456,
10480,
10481,
10491,
10497,
10499,
10501,
10509,
10560,
10570,
10578,
10584,
10586,
10587,
10589,
10607,
10674,
10708,
10730,
10743,
10768,
10769,
10771,
10777,
10786,
10788,
10793,
10798,
10799,
10894,
10934,
10946,
10974,
10980,
11007,
11008,
11011,
// 11032,
// 11042,
// 11050,
// 11053,
// 11083,
// 11107,
// 11181,
// 11226,
// 11227,
// 11228,
// 11229,
// 11231,
// 11232,
// 11233,
// 11234,
// 11253,
// 11255,
// 11256,
// 11278,
// 11309,
// 11310,
// 11311,
// 11313,
// 11316,
// 11317,
// 11318,
// 11320,
// 11329,
// 11405,
// 11517,
// 11518,
// 11521,
// 11543,
// 11557,
// 11558,
// 11598,
// 11600,
// 11623,
// 11630,
// 11631,
// 11657,
// 11659,
// 11682,
// 11771,
// 11774,
// 11851,
// 11894,
// 11976,
// 11978,
// 12028,
// 12061,
// 12122,
// 12162,
// 12302,
// 12541,
// 12605,
// 12630,
// 12764,
// 12773,
// 12800,
// 12802,
// 12831,
// 12833,
// 12834,
// 12840,
// 12842,
// 12849,
// 12902,
// 12925,
// 13017,
// 13018,
// 13019,
// 13033,
// 13085,
// 13173,
// 13312,
// 13315,
// 13352,
// 13353,
// 13355,
// 13356,
// 13357,
// 13358,
// 13360,
// 13453,
// 14202,
// 14473,
// 14475,
// 14481,
// 14836,
// 14871,
// 14930,
// 16875,
// 17574,
// 17897,
// 19013,
// 19246,
// 19286,
// 19289,
// 19291,
// 19293,
// 19300,
// 19330,
// 19334,
// 19343,
// 19346,
// 20421,
// 20639,
// 21693,
// 37811,
// 37915,
// 38040,
// 40432,
// 42344,
// 45070,
// 76393,
// 78435,
// 196918,
// 207312,
// 282561,
// 282883,
// 435573,
// 435590,
// 435655,
// 435684,
// 435707,
// 435737,
// 435750,
// 435751,
// 435756,
// 435770,
// 435809,
// 435857,
// 435874,
// 435877,
// 435878,
// 435879,
// 435885,
// 435905,
// 435906,
// 435907,
// 435909,
// 435923,
// 435962,
// 435964,
// 435965,
// 435966,
// 435968,
// 435972,
// 435985,
// 435986,
// 436010,
// 436013,
// 436025,
// 436057,
// 436060,
// 436061,
// 436064,
// 436081,
// 436083,
// 436085,
// 436086,
// 436090,
// 436192,
// 436205,
// 436229,
// 436241,
// 436248,
// 436324,
// 436410,
// 436441,
// 436451,
// 436455,
// 436535,
// 436555,
// 436558,
// 436593,
// 436594,
// 436595,
// 436632,
// 436652,
// 436653,
// 436817,
// 436826,
// 436827,
// 436830,
// 436831,
// 436832,
// 436833,
// 436849,
// 436863,
// 436940,
// 436952,
// 436971,
// 437010,
// 437039,
// 437040,
// 437042,
// 437074,
// 437079,
// 437080,
// 437084,
// 437093,
// 437094,
// 437097,
// 437102,
// 437107,
// 437109,
// 437110,
// 437111,
// 437117,
// 437126,
// 437179,
// 437190,
// 437191,
// 437198,
// 437211,
// 437235,
// 437256,
// 437269,
// 437299,
// 437300,
// 437307,
// 437316,
// 437323,
// 437326,
// 437347,
// 437426,
// 437431,
// 437433,
// 437436,
// 437461,
// 437506,
// 437514,
// 437515,
// 437516,
// 437517,
// 437518,
// 437519,
// 437520,
// 437545,
// 437547,
// 437548,
// 437549,
// 437586,
// 437647,
// 437657,
// 437671,
// 437681,
// 437683,
// 437685,
// 437697,
// 437705,
// 437760,
// 437764,
// 437776,
// 437781,
// 437821,
// 437848,
// 437923,
// 437941,
// 437968,
// 437975,
// 437980,
// 437998,
// 438004,
// 438449,
// 438465,
// 438510,
// 438618,
// 438622,
// 438623,
// 438628,
// 438638,
// 438640,
// 438641,
// 438645,
// 438646,
// 438648,
// 438663,
// 438664,
// 438678,
// 438738,
// 438813,
// 438820,
// 438821,
// 438849,
// 439344,
// 439346,
// 439351,
// 439352,
// 439353,
// 439358,
// 439360,
// 439361,
// 439365,
// 439367,
// 439368,
// 439369,
// 439370,
// 439374,
// 439375,
// 439376,
// 439379,
// 439380,
// 439382,
// 439383,
// 439385,
// 439388,
// 439390,
// 439399,
// 439404,
// 439406,
// 439407,
// 439408,
// 439413,
// 439762,
// 439763,
// 439764,
// 439766,
// 439769,
// 439844,
// 440326,
// 440328,
// 440329,
// 440332,
// 440333,
// 440335,
// 440336,
// 440337,
// 440338,
// 440339,
// 440341,
// 440344,
// 440351,
// 440352,
// 440354,
// 440355,
// 440358,
// 440362,
// 440364,
// 440365,
// 440366,
// 440367,
// 440377,
// 440378,
// 440380,
// 440386,
// 440460,
// 440727,
// 441755,
// 441967,
// 458967,
// 459035,
// 459036,
// 459092,
// 459094,
// 459095,
// 459096,
// 459098,
// 459099,
// 459102,
// 459103,
// 459104,
// 459107,
// 459111,
// 459114,
// 459115,
// 459122,
// 459140,
// 459141,
// 459149,
// 459153,
// 459154,
// 459161,
// 459169,
// 460599,
// 461185,
// 461186,
// 461292,
// 461366,
// 461444,
// 461658,
// 461680,
// 461683,
// 480553,
// 480569,
// 480657,
// 480914,
// 480998,
// 481136,
// 481494,
// 481504,
// 481756,
// 481784,
// 481860,
// 482415,
// 482418,
// 482597,
// 482598,
// 482599,
// 482659,
// 482829,
// 482999,
// 483322,
// 483334,
// 483548,
// 484697,
// 484700,
// 484799,
// 484833,
// 484837,
// 485034,
// 485221,
// 485730,
// 485769,
// 485944,
// 485945,
// 485963,
// 486009,
// 486042,
// 486043,
// 486272,
// 486279,
// 486282,
// 486284,
// 486970,
// 486996,
// 487085,
// 487558,
// 487718,
// 487720,
// 487964,
// 487978,
// 488030,
// 488166,
// 488167,
// 488168,
// 488169,
// 488490,
// 488492,
// 488791,
// 488887,
// 488920,
// 489055,
// 489281,
// 489337,
// 491283,
// 491924,
// 492486,
// 632987,
// 632992,
// 633004,
// 662317,
// 695526,
// 695528,
// 695534,
// 695536,
// 701452,
// 712209,
// 736275
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
    fetchUrl(objectId);
});

// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./LandscapeData_6.json', JSON.stringify(myArray), 'utf8');
}, 2000);
