var mysql = require("mysql2");

module.exports = function(app) {
	var connection = mysql.createConnection({
		port: 3306,
	  host: "127.0.0.1",
	  user: "root",
	  password: "ewok1138",
	  database: "scoreboard"
	});

	connection.connect(function(err) {
	  if (err) {
	    console.error("error connecting: " + err.stack);
	    return;
	  }
	  console.log("connected as id " + connection.threadId);
	});

}

//module.exports = connection;