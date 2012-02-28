var express = require("express");
var app = express.createServer();

app.set('view engine', 'jade');
app.set('view options', {layout: false});

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);


// Connect to Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newapp', function(err) {
  if (err) throw new Error(err.message);
});

require('./routes')(app);

app.listen(3000);
