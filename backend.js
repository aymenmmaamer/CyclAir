const GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
const GHInput = require('graphhopper-js-api-client/src/GHInput');
const axios = require('axios')
const querystring = require('querystring');

const API_KEY_GRAPHHOPPER = '12ef0796-c22c-4cc1-9a8f-d36265819b81';
const API_KEY_GOOGLE = 'AIzaSyC7kzzvA_WhjWsXX8LRv349GgcdFDPsShw'

const address = [
  {
    "street": "Wilhelminenhofstraße",
    "number": "75A",
    "zip": 12459,
    "place": "Berlin",
    "country": "Germany"
  },
  {
    "street": "Treskowallee",
    "number": "8",
    "zip": 10318,
    "place": "Berlin",
    "country": "Germany"
  }
];

async function addressToLocation(address = 'Wilhelminenhofstraße 75A, 12459 Berlin, Germany') {
  const params = querystring.stringify({
    address,
    key: API_KEY_GOOGLE,
  });

  const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
  return result.data;
}

async function apiCallGraphHopper(locations) {

  let test;

  const ghRouting = new GraphHopperRouting({
    key: API_KEY_GRAPHHOPPER, vehicle: 'bike', elevation: false, optimize: true,
  });

  locations.forEach((location) => {
    ghRouting.addPoint(new GHInput(location));
  });

  await ghRouting.doRequest()
    .then((response) => {

      console.log(`\nDie Distanz beträgt: ${(response.paths[0].distance)}m.`);
      console.log(`Die Dauer beträgt: ${(response.paths[0].time / 1000)}s.`);
      console.log(response)
      test = response
    })
    .catch((err) => {
      console.error(err.message);
    });
  return test.paths[0].distance



}

async function getLocations() {

  const latLng = await Promise.all(address.map(async (location) => {
    const address = await addressToLocation(`${location.street} ${location.number}, ${location.zip} ${location.place}, ${location.country}`);
    return address.results[0].geometry.location;
  }));
  console.log(latLng)
  return latLng
}

/*async function main() {
  const latLng = await Promise.all(address.map(async (location) => {
    const address = await addressToLocation(`${location.street} ${location.number}, ${location.zip} ${location.place}, ${location.country}`);
    return address.results[0].geometry.location;
  }));
  console.log(latLng);
  apiCallGraphHopper(latLng);
} */

module.exports= {
  apiCallGraphHopper,
  getLocations,
  addressToLocation
};


/* main().then((nothing) => {
console.log('Nothing', nothing);
}); */