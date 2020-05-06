# Files

## authRoutes.js

contains authentication routes

## verifyUser.js

contains middleware to verify token

### Usage

```javascript
let verify = './verifyUser.js'; // import middleware
let express = require("express");
let app = express();

app.get('/anyRoute', verify, (req, res)=>{ // setup middleware as the first one so it can check token before making any functionality
    // write whate you need 
    // ...
})


```