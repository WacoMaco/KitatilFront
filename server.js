var history = require('connect-history-api-fallback');
let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();

app.use(express.static(__dirname + "/dist"));
app.use(history());
let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);