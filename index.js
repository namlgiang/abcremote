var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello!');
});

app.get('/sale', function (req, res) {
  fs.readFile('sale.event', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    res.writeHead(200, {
      'Cache-Control': 'no-cache'
    });

    res.end(data);
  });
});

app.get('/redeem/:code', function (req, res) {
  var code = req.params["code"];

  fs.readFile('promotion.code', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    res.writeHead(200, {
      'Cache-Control': 'no-cache'
    });

    var data = data.replace(/\n+/g, " ").trim()
    var codes = data == "" ? [] : data.split(' ');
    console.log("Total codes: " + codes.length);

    for(var i=0; i<codes.length; i++)
      if(code == codes[i]) {
        res.end("1");

        fs.appendFile("used.code", code + " ", function(err) {});

        codes.splice(i,1);
        codes = codes.join("\n");

        fs.writeFile("promotion.code", codes, function(err) {
          if(err) {
            console.log(err);
          }
        });

        return;
      }

    fs.readFile("used.code", "utf8", function(err, data) {
      if(err) {
        res.end("0");
        return;
      }
      if(data.indexOf(code) != -1)
        res.end("2");
      else
        res.end("0");
    });
  });

});

app.use(express.static('abcremote'));

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
