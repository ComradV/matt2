var http = require('http');
var formidable = require('formidable');
//var fs = require('fs');.
var nodemailer = require('nodemailer');


http.createServer(function (req, res) {
  if (req.url == '/sendmail') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vasiliev.g.i@gmail.com',
    pass: 'Berlin1945'
  }
});

var mailOptions = {
  from: 'vasiliev.g.i@gmail.com',
  to: fields.to,
  subject: fields.subject,
  text: fields.text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

      
/*      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/g.vasiliev/nodejs/uploaded files/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });*/
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="sendmail" method="post" enctype="multipart/form-data">');
    res.write('To:<input type="text" name="to" placeholder="to" value="neonqwer@mail.ru"><br>');
    res.write('Subject:<input type="text" name="subject" placeholder="subject" value="Hello, Node.JS!"><br>');
    res.write('Text:<input type="text" name="text" placeholder="text" value="i try to send my mail with Node.JS"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
console.log("upload server runs on 8080!");
////////////////////////////////////