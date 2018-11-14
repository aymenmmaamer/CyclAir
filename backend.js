const GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
const GHInput = require('graphhopper-js-api-client/src/GHInput');
const axios = require('axios');
const querystring = require('querystring');
const Keys = require('./apiKeys');

// import { API_KEY_GRAPHHOPPER, API_KEY_GOOGLE } from "./apiKeys";

const GRAPHHOPPER_KEY = Keys.API_KEY_GRAPHHOPPER;
const API_KEY_GOOGLE = Keys.API_KEY_GOOGLE;

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

  let responseFromGraphhopper;

  const ghRouting = new GraphHopperRouting({
    key: GRAPHHOPPER_KEY, vehicle: 'bike', elevation: false, optimize: true,
  });

  locations.forEach((location) => {
    ghRouting.addPoint(new GHInput(location));
  });

  await ghRouting.doRequest()
    .then((response) => {

      console.log(`\nDie Distanz beträgt: ${(response.paths[0].distance)}m.`);
      console.log(`Die Dauer beträgt: ${(response.paths[0].time / 1000)}s.`);
      console.log(response)
      responseFromGraphhopper = response
    })
    .catch((err) => {
      console.error(err.message);
    });
  return responseFromGraphhopper.paths[0].distance
}

async function getLocations(addresses) {

  const latLng = await Promise.all(addresses.map(async (location) => {
    const address = await addressToLocation(`${location.street} ${location.number}, ${location.zip} ${location.place}, ${location.country}`);
    return address.results[0].geometry.location;
  }));
  //console.log(latLng)
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