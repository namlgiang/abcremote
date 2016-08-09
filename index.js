var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hi !');
});

app.get('/sale', function (req, res) {
  res.send('1');
});

app.get('/redeem/:code', function (req, res) {
  var code = req.params["code"];

  fs.readFile('promotion.code', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    var data = data.replace(/\n+/g, " ").trim()
    var codes = data == "" ? [] : data.split(' ');
    console.log("Total codes: " + codes.length);

    for(var i=0; i<codes.length; i++)
      if(code == codes[i]) {
        res.send("1");
        codes.splice(i,1);
        codes = codes.join("\n");

        fs.writeFile("promotion.code", codes, function(err) {
          if(err) {
            console.log(err);
          }
        });

        return;
      }
    res.send("0");
  });

});

app.use(express.static('abcremote'));

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
