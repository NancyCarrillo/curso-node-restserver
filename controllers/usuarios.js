const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    // const { q, nombre = 'no name', apikey } = req.query;
    const {limite = 5 , desde = 0}= req.query;
    const query = {estado:true}
    // const usuarios = await Usuario.find(query)
    // .skip(Number( desde ))
    // .limit(Number( limite ));

    // const total = await Usuario.countDocuments(query);
    // coleccion de promesas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);
    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {
    // crear midleware personalizado 
    const { nombre, password, correo, rol } = req.body;
    // verifica correo

    const salt = bcryptjs.genSaltSync();

    const data = {
        nombre,
        password,
        correo,
        rol
    }
    data.password = bcryptjs.hashSync(password, salt);
    const usuario = new Usuario(data);
    try {
        await usuario.save();
        res.status(200).json({
            // data,
            usuario,
            msg: 'post API - controladorPost',

        })
    } catch (error) {
        res.status(500).json({ msg: 'Error al guardar usuario', error });

    }

}

const usuariosPut = async  (req, res = response) => {
    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;
        
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        // msg: 'put API -controladorPut',
        usuario
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API -controladorDelete'
    })

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API -controladorPatch'
    })

}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}