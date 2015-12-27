var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
	var app = express();

	app.use(express.static('./app/public'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(expressValidator());

	app.set('view engine', 'ejs');
	app.set('views', './app/views')

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	app.use(function(req, res, next){
		res.status(404).render("erros/404");
  });

  app.use(function(error,req, res, next){
		if (process.env.node === 'prod') {
    	res.status(500).render("erros/500");
		}
		res.render(error);
		next();
  });

	return app;
}
