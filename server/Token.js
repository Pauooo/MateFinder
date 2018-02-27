const io = require('socket.io')();
const jwtAuth = require('socketio-jwt-auth');

// using middleware
io.use(jwtAuth.authenticate({
  secret: 'Your Secret', // required, used to verify the token's signature
  algorithm: 'HS256', // optional, default to be HS256
}, (payload, done) => {
  // done is a callback, you can use it as follows
  User.findOne({ id: payload.sub }, (err, user) => {
    if (err) {
      // return error
      return done(err);
    }
    if (!user) {
      // return fail with an error message
      return done(null, false, 'user does not exist');
    }
    // return success with a user info
    return done(null, user);
  });
}));
