var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var app = express();

app.set("view engine","jade");
app.set("views",__dirname+"/public/views");
app.use(express.static(__dirname+"/public"));

app.get("/", function(req,res) {
	res.render("index")
})

app.get("/login",function(req,res) {

var newContact = req.body;
  newContact.createDate = new Date();

  if (!(req.body.user.firstName || req.body.user.lastName)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
	
})

app.set("port",process.env.PORT || 300);
app.listen(app.get("port"),function() {
	console.log("App is running on"+ app.get("port"));
	console.log(__dirname)
})

