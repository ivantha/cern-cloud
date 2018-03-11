var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer')
const path = require('path');
const http = require('http');
const url = require('url');
const fs = require('fs');
const util  = require('util');

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

const fileUpload = require('express-fileupload');
app.use(fileUpload());

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
      files[i] = {
        name: files[i].name.substring(1, files[i].name.length),
        size: files[i].fileInfo['{DAV:}getcontentlength']
      }
    }
    
    res.status(200).json(files);
  }).catch(error => {
    console.log(error);
    res.status(400).end
  });
});

app.post('/files/upload', function(req, res) {
  req.files.clientFile.mv('./uploads/' + req.files.clientFile.name, function(err) {
    if (err){
      return res.status(500).send(err);
    }else{
      oc.files.putFile('/', './uploads/' + req.files.clientFile.name).then(status => {
        // Successfully uploaded to the OwnCloud
        res.status(200).end
      }).catch(error => {
        console.log(error)
      })    
    } 
  });
});

app.get("/files/download", function (req, res, next) {
  var outputFileName = './downloads/' + req.query.name
  oc.files.getFile('/' + req.query.filename, './downloads/' + req.query.filename).then(status => {
  var file = './downloads/' + req.query.filename;
  res.download(file);
  }).catch(error => {
    console.log(error)
  }) 
});

// Initialize the app.
var server = app.listen(process.env.PORT || 7000, function () {
  var port = server.address().port;
  console.log("CERN Cloud Server now running on port", port);
});