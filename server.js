var history = require('connect-history-api-fallback');
let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history({
    disableDotRule: true,
    verbose: true
  }));
let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);