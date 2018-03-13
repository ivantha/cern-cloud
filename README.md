# cern-cloud

> CERN Cloud for administrating ownCloud

## Setup ownCloud

You must have an instance of ownCloud running in localhost:80 for the app to work.

##### 1) Install and run Docker

##### 2) Execute the command, 
```
docker run -d -p 80:80 owncloud:8.1
```

## Build Setup

##### 1) Install dependencies
```
npm install
```

##### 2) Build for production with minification
```
npm run build
```

##### 3) Start the server at http://localhost:4040/#/
```
nodemon server-start.js
```
