const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath ='/api/usuarios';

        // conectar a base de datos
        this.conectarDB();
        
        //middlewares
        this.middelwares();

        //rutas de mi aplicacion
        this.routes();
    }
    
    async conectarDB(){

        await dbconnection();
    }
    middelwares(){
        // cors
        this.app.use(cors())

        // lectura y parseo del body serializa json
        this.app.use(express.json())

        // directorio publico
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))  

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto:', this.port);
        })
    }

}

module.exports = Server;