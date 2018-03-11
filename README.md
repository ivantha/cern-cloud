# cern-cloud

[![Build Status](https://travis-ci.org/OshanIvantha/cern-cloud.svg?branch=master)](https://travis-ci.org/OshanIvantha/cern-cloud)

## Instructions to run the app

### Starting the ownCloud instance
Install Docker and run,

```
$ docker run -d -p 80:80 owncloud:8.1
```

### Starting the node server

Go to the node-server directory from the root directory using
```
cd node-server
```

Install dependancies
```
npm install
```

Run the server using the command,
```
nodemon server.js
```

### Starting the app
Go to the vue-client directory from the root directory using
```
cd vue-client
```

Install dependancies
```
npm install
```

Run the app using the command,
```
npm run dev
```