// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();


console.log('startring server');

// Parsers for POST data
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));

app.use(cors());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const PROXY_URL = process.env.PROXY_URL || 'http://localhost:8080'
// Set our api routes proxy to point to spring boot server
//app.use('/server', proxy('http://localhost:8080'));
//app.use('/server', proxy('https://koby5i-intro-bike-auth0-spring.herokuapp.com'));
console.log('proxy url=' + PROXY_URL);
app.use('/server', proxy(PROXY_URL));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));           // works
  //res.sendFile(path.join(__dirname, 'dist/bike-ui/index.html')); // does not work
  //res.sendFile('index.html', {root: './dist/bike-ui'});          // does not work
});

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || 4200
app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT, () => console.log('API running on port=' + PORT ));
