const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
// Ruta: host + api/auth


router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatirio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({ min: 5 }),
    validarCampos
], crearUsuario );

router.post('/', [
    check('email', 'El email es obligatirio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({ min: 5 }),
    validarCampos
], loginUsuario);
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;