const dotenv = require('dotenv');
dotenv.config();

/**
 * Configuración de variables de entorno.
 * Estas variables pueden ser configuradas en un archivo .env en la raíz del proyecto.
 * Si no se encuentran definidas, se utilizarán los valores por defecto.
 */
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development', 
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  PASSWORD: process.env.PASSWORD || '123456',
  USER: process.env.USER || 'root',
  DATABASE: process.env.DATABASE || 'loginsystem'
};
