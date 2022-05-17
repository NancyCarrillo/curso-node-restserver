
const{ Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido, EmailExiste, existeUsuarioporId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioporId ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut  );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mayor a seis letras').isLength({min:6}),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    check('correo').custom( EmailExiste ),
    validarCampos
], usuariosPost );

router.delete('/:id',[
check('id','No es un id valido').isMongoId(),
check('id').custom( existeUsuarioporId ),
validarCampos]
,usuariosDelete );

router.patch('/', usuariosPatch );
module.exports= router;