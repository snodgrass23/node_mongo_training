var mongoose = require('mongoose');

var User = new mongoose.Schema({
  email     : { type: String, index: true, required: true, lowercase: true, trim: true, unique: true },
  name      : { type: String, trim: true, required: true },
  about     : { type: String, trim: true },
  team      : [{ type: mongoose.Schema.ObjectId, ref: 'Team' }]
}, {strict: true});

// Plugins

User.plugin(require('./timestamps'));


//middleware

User.pre('init', function(next, data) {
  if (data.name == "Hunter") {
    data.name = "Our Humble Leader";
  }
  next();
});


User.methods.findSimilar = function(callback) {
  // find all similar users
  callback();
};


User.statics.findAll = function(callback) {
  // find all users
  callback();
};


// Export

module.exports = mongoose.model('User', User);
