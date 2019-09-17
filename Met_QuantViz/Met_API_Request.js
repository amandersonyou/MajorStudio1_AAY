// WIP code to pull data from the Met API. Goal is to look at a subset of "notable"
// works from the modern art department and assess the lifespan of the artists, and
// when in their lives they created their notable works.


// Using the base URL to search for object details within the fetched data.
const objectBaseUrl =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

// finding objects by department, choosing to look at department 21, modern art
function fetchObjectsByDepartment(departmentId) {
  const objectsUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=21" +


  fetchMuseumData(objectsUrl);
}

let metData;
let myArray = [];

// fetch a query
function fetchMuseumData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log("fetchMuseumData", data);
      fetchObjects(data);
    });
}


/* Selecting art from Modern Art that has the boolean value of isHighlight as 
true in order to select what the Met consides "notable". Will also want to look 
at the object terms for lifespan: artistBeginDate & artistEndDate, as well as 
objectDate for when the art was created.*/

// from the response, fetch objects
function fetchObjects(data) {
  // .slice(0, 10) gets a new array with just the first 10 elements
  // because fetching 10000 objects at once can be a strain on the browser
  let objectIDs = data.objectIDs.slice(0, 10);
  console.log("fetching: " + objectIDs.length + " objects");
  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);
    // How do I include multiple object parameters? Is the boolean used correctly?
    let objUrl = objectBaseUrl + 'isHighlight=true';
    window
      .fetch(objUrl)
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        addObject(data);
      });
  });
}

/* will detail these once I'm better able to navigate the api and see what 
elements I can detail out.*/
// create your own array using just the data you need
function addObject(objectData) {
  var currentID = objectData.objectID;
  var currentTitle = objectData.title;
  var currentDate = objectData.objectBeginDate;
  var imgUrl = objectData.primaryImage;
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["title"] = currentTitle;
  myArray[index]["date"] = currentDate;
  myArray[index]["image"] = imgUrl;

  /*
    myArray.push({
      title: objectData.title,
      date: objectData.objectBeginDate,
      image: objectData.primaryImage
    })
     */
  console.log("object at index", index, myArray[index]);
}
