'use strict';

var R               = require('ramda'),
    config          = require('config'),
    path            = require('path'),
    fs              = require('fs'),
    express         = require('express'),
    session         = require('express-session'),
    app             = express(),
    http            = require('http').Server(app),
    WebSocketServer = require('ws').Server,
    wss             = new WebSocketServer({server : http}),
    pageRoutes      = require('./routes/index'),
    authRoutes      = require('./routes/auth'),
    playerApiRoutes = require('./routes/api/player'),
    passport        = require('./auth/passport').init();

app.use(session({
  secret            : R.path(['session', 'secret'], config),
  resave            : true,
  saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.static(__dirname + '/../dist'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/views/*', function(req, res) {
  res.render(path.join(app.get('views'), req.params[0]));
});

app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/api/v1/player', playerApiRoutes);

wss.emit = function(data) {
  wss.clients.forEach(function(client) {
    try {
      client.send(data);
    } catch (e) {
    }
  });
};

R.forEach(http.listen.bind(http), config.server.enabledPorts);
