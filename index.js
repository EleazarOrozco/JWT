const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config.js');


//Seleccionamos el puerto
const PORT = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


//Añadimos rutas
const router = require('./Routes/router.js');
app.use('/api', router);

//Corremos el servidor
app.listen(PORT, () => console.log(`Running on ${config.HOST} ${PORT} ${config.DATABASE}`));