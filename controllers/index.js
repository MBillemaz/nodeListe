module.exports.controller = function(app){
  app.get('/', function(req, res) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Welcome to Home!');
  });
}
