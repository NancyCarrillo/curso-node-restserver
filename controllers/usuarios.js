const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) => {

    const { q, nombre = 'no name', apikey } = req.query;

    res.json({
        msg: 'get API - controladorGet',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = async (req, res = response) => {
    // crear midleware personalizado 

   

    const { nombre, password, correo, rol } = req.body;
    // verifica correo
    const verificaEmail = await Usuario.findOne({ correo });

    if (verificaEmail) {
        return res.status(400).json({
            msg: 'El correo ya existe '
        });
    }
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
            data,
            usuario,
            msg: 'post API - controladorPost',

        })
    } catch (error) {
        res.status(500).json({msg:'Error al guardar usuario',error});

    }

}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API -controladorPut',
        id
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