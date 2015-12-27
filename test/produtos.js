var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {

  beforeEach(function(done) {
          var connection = express.infra.mysqlConnection();
          connection.query("delete from livros", function(err,result){
              if(!err){
                  done();
              }
          });
   });

    it('#listagem de produtos json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done)
    });

    it('#cadastro invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:"",descricao:"livro de teste"})
            .expect(400,done)

    });

    it('#cadastro valido', function (done) {
        request.post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302, done)
    });
});
