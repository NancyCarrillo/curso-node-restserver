const { response }= require('express');


const usuariosGet = (req, res = response)=> {

    const {q, nombre = 'no name', apikey } = req.query;

    res.json({
        msg:'get API - controladorGet',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req, res = response)=> {

    const { nombre, edad }= req.body;

    res.json({
        msg:'post API - controladorPost',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response)=> {
    const id = req.params.id;
    res.json({
        msg:'put API -controladorPut',
        id
    })
}

const usuariosDelete =  (req, res = response )=> {
    res.json({
        msg:'delete API -controladorDelete'
    })

}

const usuariosPatch =  (req, res = response )=> {
    res.json({
        msg:'patch API -controladorPatch'
    })

}
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}