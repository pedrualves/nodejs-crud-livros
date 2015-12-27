module.exports = function(app){
  app.get('/promocoes/form',function(req,res){

    var connection = app.infra.mysqlConnection();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err,results){

      if(err){
        return next(err);
      }

      res.format({
        html: function(){
          res.render('promocoes/form', {lista: results});
        },
        json: function(){
          res.json(results);
        }
      });
    });

    connection.end();
  });

  app.post('/promocoes/salva',function(req,res){
    var promocao = req.body;
    console.log(promocao);
    app.get('io').emit('novaPromocao',promocao);
    res.redirect('/promocoes/form');
  });
}
