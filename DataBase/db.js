const mysql = require('mysql');
const config = require('../config/config.js');

/**
 * Conexión a la base de datos MySQL utilizando la configuración definida en el archivo config.js.
 */
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  database: config.DATABASE,
  password: config.PASSWORD,
  port: config.PORT
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
