// Connect to Test Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newapp_test', function(err) {
  if (err) throw new Error(err.message);
});

var vows = require('vows'),
    assert = require('assert'),
    UserModel = require('./models/user');


// Macros
var noErrors = function (err, result) {
  // assert errors are null
  assert.isNull(err);
};

var numUsersShouldBe = function(numUsers) {
  var context = {
    topic: function() {
      UserModel.find().run(this.callback);
    },
    'errors should be null': noErrors,
    'result should be an array': function(err, result) {
      assert.typeOf(result, 'array');
    }
  };
  context['result should have '+numUsers+' user(s)'] = function(err, result) {
    assert.equal(result.length, numUsers);
  };

  return context;
};

var removeAll = function() {
  return {
    topic: function() {
      UserModel.remove({}, this.callback);
    },
    'errors should be null': noErrors
  };
};




// describe test batches

vows.describe('users model test')
.addBatch({
 'remove all users' : {
    topic: function() {
      UserModel.remove({}, this.callback);
    },
    'errors should be null': function(err, result) {
      assert.isNull(err);
    }
  }
}).addBatch({
  'list all users' : {
    topic: function() {
      UserModel.find().run(this.callback);
    },
    'errors should be null': noErrors,
    'result should be array with user': function(err, result) {
      assert.typeOf(result, 'array');
      assert.equal(result.length, 0);
    }
  }
}).addBatch({
  'create user without email address' : {
    topic: function() {
      var user = new UserModel({
        name:"myname"
      });
      user.save(this.callback);
    },
    'errors should NOT be null': function(err, result) {
      assert.isNotNull(err);
    }
  },
  'create user with all required properties' : {
    topic: function() {
      var user = new UserModel({
        name:"myname",
        email:"test222@test.com"
      });
      user.save(this.callback);
    },
    'errors should be null': noErrors
  }
}).addBatch({
  
  // use macro this time to test number of users
  'list all users again' : numUsersShouldBe(1)
}).addBatch({

  // use macro to clear any needed data for future tests
  'clear data' : removeAll()
})['export'](module);

