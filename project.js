var http = require('http');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');

http.createServer((req, res) => {
if (req.url == '/fileupload') {
   var form = new formidable.IncomingForm();
   form.parse(req, (err, fields, files) => {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'https://github.com/jayedsikder/dous.github.io/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, (err) => {
       if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
   });
 }); 
 } else {
   fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 Not Find');
  } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
 }
});
 }
}).listen(8080);                                                                                                                                                                                                         
