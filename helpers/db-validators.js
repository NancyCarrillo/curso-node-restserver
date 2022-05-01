const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async  ( rol = '' )=>{
    const existeRol = await Role.findOne({rol}) ;
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la BD`)
    
    }   
    return true;
}

const EmailExiste = async ( correo = '' )=>{
    const verificaEmail = await Usuario.findOne({ correo });
    if (verificaEmail) {
        throw new Error(`El correo: ${correo} ya existe esta registrado`);
    }

}

const existeUsuarioporId = async ( id )=>{
    const verificaUsuario = await Usuario.findOne({ id });
    if (!verificaUsuario) {
        throw new Error(`El Usuario: ${id} no esxiste`);
    }

}

module.exports={
    esRolValido,
    EmailExiste,
    existeUsuarioporId
};