var express= require('express');
var http = require('http');
var fs = require("fs");
var url = require('url');


http.createServer(function(request, response) {
    urlObj = url.parse(request.url, true);
    
    if(request.url==="/index" || (request.url && !urlObj.query.iso))
    {
    fs.readFile("index.html", function(err, data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
    }
    );
        
    }
    else if(urlObj.query.iso){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var date = new Date(urlObj.query.iso)
        if(isNaN(date)==true)
            {
            date = new Date(parseInt(urlObj.query.iso));
            }
        response.write(date.toString());
        response.write(date.getTime().toString());
        response.end();
    }
    else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("error");
    response.end();
    }
    
}).listen(8080);