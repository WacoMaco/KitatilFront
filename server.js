var history = require('connect-history-api-fallback');
let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
const app = express();
app.use(history({
    verbose: true
}));
app.use('/',express.static(__dirname + "/dist"));
let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);