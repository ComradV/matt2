var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
var url = require('url');
var mexp = require('math-expression-evaluator');
var fs = require('fs');
var events = require('events');


function accept(req, res){
//  file.serve(req, res);
///////////////////////////////Put code there!
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST');

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache'
  });
  var q = url.parse(req.url, true).query;
  try{
    var resptext = mexp.eval(q.toCalc)
  } catch (e){
    var resptext = "NOT COMPUTED!";
  }
  res.write(""+resptext);
  res.end();
  fs.appendFile('calcLog.txt', `${Date()}:${q.toCalc}=${resptext}\n`, function (err) {
    if (err) throw err;
  });
///////////////////////////////
}

function accept2(req, res){
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST');

var q = url.parse(req.url, true).query;
console.log(req.url);
var options = {
    host: q.host,
    path: "/"+q.path
}

//console.log(`${q.host} and path is:${q.path}`);

var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
      fs.appendFile('parse.txt', `${Date()}:${options.host}\n${data}\n`, function (err) {
      if (err) throw err;
    });

    });
});
request.on('error', function (e) {
    console.log("alarm! "+e.message);
});
request.end();





///////////////////////////////
}

http.createServer(accept2).listen(8080);

console.log('Server running on port 8080');

var eventEmitter = new events.EventEmitter();

var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
//eventEmitter.emit('scream');
