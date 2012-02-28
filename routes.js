var UserModel = require('./models/user'),
    TeamModel = require('./models/team');

exports = module.exports = function(app) {

  // index page
  app.get('/', function(req,res) {
    UserModel.find().run(function(err, users) {
      TeamModel.find().run(function(err, teams) {
        res.render('index', {users:users, teams:teams});
      });
    });
  });


  // create user
  app.post('/user', function(req,res) {
    var user = new UserModel(req.body);
    user.save(function(err) {
      res.redirect('/');
    });
  });


  // create team
  app.post('/team', function(req,res) {
    var team = new TeamModel(req.body);
    team.save(function(err) {
      res.redirect('/');
    });
  });


  // get user
  app.get('/user/:id', function(req,res) {
    UserModel.findById(req.params.id).run(function(err, user) {
      res.render('user', {user:user});
    });
  });


  // get user with team join
  app.get('/user/:id/show_team', function(req,res) {
    UserModel.findById(req.params.id).populate('team').run(function(err, user) {
      res.render('user', {user:user});
    });
  });

};