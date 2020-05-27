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
	} else if (src == "getNote"){
		showNote(req, res, params.idx);
	} else if(src == "setNote"){
		saveNote(req, res, params.idx);
	} else if(src == "deleteNote"){
		deleteNote(params.idx);
		res.send("success");
	}
};

function root(req, res){
	console.log("request");
	let notes = getNotes();
	console.log(notes);
	res.render("notes/index", {notes:notes});
}

function showNote(req, res, idx){
	console.log(getNotes()[idx]);
	res.send(getNotes()[idx]);
}

function saveNote(req, res, idx){
	console.log(req.body);
	let note = {
		name:req.body.name,
		content:req.body.content
	};
	let notes = getNotes();
	if(idx == -1){
		notes.push(req.body);
	} else {
		notes[idx] = note;
	}
	fs.writeFileSync(USER_PATH+"/notes.json", JSON.stringify({notes}));
	res.send("Success");
}

function deleteNote(idx){
	let notes = getNotes();
	notes.splice(idx, 1);
	fs.writeFileSync(USER_PATH+"/notes.json", JSON.stringify({notes}));
}

function getNotes(){
	return JSON.parse(fs.readFileSync(USER_PATH+"/notes.json"))["notes"];
}
