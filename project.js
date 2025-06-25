var http = require('http');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer((req, res) => {
if (req.url == '/fileupload') {
   var form = new formidable.IncomingForm();
   form.parse(req, (err, fields, files) => {
      var oldpath = files.filetoupload.filepath;
      var uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
         fs.mkdirSync(uploadDir, { recursive: true });
      }
      var newpath = path.join(uploadDir, files.filetoupload.originalFilename);
      fs.rename(oldpath, newpath, (err) => {
       if (err) throw err;
      res.write('<h1>File uploaded and moved!</h1><br><button onclick="history.back()">GO Back</button>');
      return res.end();
   });
 }); 
 } else {
   var q = url.parse(req.url, true);
   var filename = "test.html" + q.pathname;
   fs.readFile(filename, (err, data) => {
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
