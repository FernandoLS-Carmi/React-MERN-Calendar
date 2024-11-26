const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.use( validarJWT )

// Todas tienen que pasar por la validacion del JWT
// Obtener evento
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', [ 
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha final es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;