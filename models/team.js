var mongoose = require('mongoose');

var Team = new mongoose.Schema({
  name      : { type: String, trim: true, required: true }
}, {strict: true});

// Plugins

Team.plugin(require('./timestamps'));

// Export

module.exports = mongoose.model('Team', Team);