var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hi !');
});

app.get('/sale', function (req, res) {
  res.send('0');
});

app.use(express.static('abcremote'));

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
