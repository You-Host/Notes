
/*jshint node: true*/
const fs = require("fs");

var ROOT_PATH;
var USER_PATH;

module.exports.init = function(root, user){
	ROOT_PATH = root;
	USER_PATH = user;
};

module.exports.onRequest = function(src, req, res, params, args){
	if(src == "root"){
		root(req,res);
	}
};

function root(req, res){
	console.log("request");
	res.render("notes/index");
}
