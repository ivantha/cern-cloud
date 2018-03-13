const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to the Vue app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '4040';
app.set('port', port);

http.createServer(app).listen(port, () => console.log(`Running on localhost:${port}`));
