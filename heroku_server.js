var express = require('express');
var app = express();
var path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.static('dist'));

// viewed at http://localhost:8080
app.get('*', function(req, res) {
	res.sendFile('index.html');
});

console.log('Starting server on port: ' + PORT);

app.listen(PORT);
