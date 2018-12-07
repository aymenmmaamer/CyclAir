const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const backend = require('./backend')

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
/* app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
}); */

/* app.get('/api/graphhopper', asyncMiddleware(async (req, res) => {
  const locations = await backend.getLocations();
  const response = await backend.apiCallGraphHopper(locations);
  res.send({ express: `Die Route von der Treskowallee 8 bis zur Wilhelminenhofstraße 75a beträgt ${response} Meter` });
})); */

app.post('/api/graphhopper-post', asyncMiddleware(async (req, res) => {
  const { address } = req.body;
  const locations = await backend.getLocations(address);
  const response = await backend.apiCallGraphHopper(locations);
  res.json({express: response});
}));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));