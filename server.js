//Creating express framework
var express = require('express');
var fs = require('fs');
var app = express();

//Returning the requested file
app.use(express.static(__dirname +'/'));

app.get('/',function(req,res){
	console.log("here")


});

//Port is listening on port 3003
app.listen(3003)
	