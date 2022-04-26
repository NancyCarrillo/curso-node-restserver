const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre :{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type : String ,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type : String ,
        required:[true, 'El password es obligatorio']
    },
    img:{
        type : String 
    },
    rol:{
        type : String ,
        required: true ,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type : Boolean,
        default: true  
    },
    google:{
        type : Boolean,
        default: false 
    }
});


module.exports = model('Usuario', UsuarioSchema);
// {
//     usuario:'nan',
//     correo:'nan@gmail.com',
//     password:'123',
//     img:'123456789',
//     rol: '123456789',
//     estado: false,
//     google: false
// }