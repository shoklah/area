module.exports = function(app, auth) {
    function checkAuth(req, res, next) {
      if (req.headers.authtoken) {
        auth.verifyIdToken(req.headers.authtoken)
          .then(() => {
            next();
          }).catch(() => {
            res.status(403).send('Unauthorized');
          });
      } else {
        res.status(403).send('Unauthorized');
      }
    }

    app.use('/', checkAuth);
};