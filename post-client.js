var http = require('http');

var configuracoes = {
  hostname: 'localhost',
  port: 3000,
  path: '/produtos',
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
};

var client = http.request(configuracoes, function(res){
  console.log(res.statusCode);
  res.on('data', function(body){
    console.log('Corpo: ' + body);
  });
});

var produto = {
  titulo: 'mais sobre node',
  descricao: 'node javascript',
  preco: 99
}

client.end(JSON.stringify(produto));
