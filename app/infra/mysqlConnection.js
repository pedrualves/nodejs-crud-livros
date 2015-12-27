var mysql = require('mysql');

var createMysqlConnection = function(){

	if (!process.env.NODE_ENV || process.env.node === 'dev') {
	        return mysql.createConnection({
	            host: 'localhost',
	            user: 'root',
	            password: 'abc123',
	            database: 'casadocodigo'
	        });
	    }

  if (process.env.NODE_ENV == 'test') {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'abc123',
          database: 'casadocodigoteste'
      });
  }
}

module.exports = function(){
	return createMysqlConnection;
}
