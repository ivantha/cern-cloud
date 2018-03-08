var express = require("express");
var bodyParser = require("body-parser");

var owncloud = require('js-owncloud-client');
var oc = new owncloud('http://localhost:80');

// Login to OwnCloud
oc.login('ivantha', 'cat').then(status => {
  // Login successful
}).catch(error => {
  // HANDLE ERROR
});

var app = express();
app.use(bodyParser.json());

// Disable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET", "POST");
  next();
});

app.get("/files/all", function (req, res, next) {
  oc.files.list('/').then(files => {
    files.shift()

    // Remove slash at the begining of the file name
    for (var i = 0; i < files.length; i++) {
      files[i].name = files[i].name.substring(1, files[i].name.length)
    }
    
    res.status(200).json(files);
  }).catch(error => {
    console.log(error);
    res.status(400).json(error);
  });
});

// Initialize the app.
var server = app.listen(process.env.PORT || 7000, function () {
  var port = server.address().port;
  console.log("CERN Cloud Server now running on port", port);
});