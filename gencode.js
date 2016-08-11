var fs = require("fs");
var param = process.argv[2];

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function randomString(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

if(param == "clear") {
  fs.writeFile("promotion.code", "", function(err) {
    if(err) {
      console.log(err);
    }
  });
}
else {

  var quantity = parseInt(param);

  fs.readFile('promotion.code', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    var data = data.replace(/\n+/g, " ").trim()
    var codes = data == "" ? [] : data.split(' ');

    function exists(c) {
      for(var i=0; i<codes.length; i++)
        if(codes[i] == c)
          return true;
      return false;
    }

    for(var i=0; i<quantity; i++) {
      var newCode = randomString(5);
      while(exists(newCode)) newCode = randomString(9);
      console.log(newCode);
      codes.push(newCode);
    }

    console.log("Total codes: " + codes.length);
    codes = codes.join("\n");
    fs.writeFile("promotion.code", codes, function(err) {
      if(err) {
        console.log(err);
      }
    });

  });

}
