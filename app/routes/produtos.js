module.exports = function(app){
	app.get('/produtos', function(req, res, next){

		var connection = app.infra.mysqlConnection();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err,results){

			if(err){
				return next(err);
      }

			res.format({
				html: function(){
					res.render('produtos/lista', {lista: results});
				},
				json: function(){
					res.json(results);
				}
			});
		});

		connection.end();

	});

	app.get('/produtos/remove', function(req, res){

	});

	app.get('/produtos/form', function(req, res){
		var produto;
		res.render('produtos/form', {errosValidacao:null, produto:{}});
	})

	app.post('/produtos', function(req, res){
		var connection = app.infra.mysqlConnection();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		var produto = req.body;

		req.assert('titulo','titulo eh obrigatorio!').notEmpty();
		req.assert('preco','preco eh obrigatorio').notEmpty();
		req.assert('descricao','descricao eh obrigatoria').notEmpty();

		var erros = req.validationErrors();
		if(erros){
			res.format({
				html: function(){
					res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});
			return;
		}

		produtosDAO.salva(produto, function(err, result){
			res.redirect('/produtos');
		})

	})
}
