
/* ================================
    Rutas de Eventos / Events
    hots + '/api/events'
================================ */

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require('../helpers/isDate') 
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.use( validarJWT );

//obtener eventos 
router.get( '/', getEventos );

//crear evento 
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento,
);

//actualizar eventos 
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

//borrar eventos 
router.delete( '/:id', eliminarEvento );

module.exports = router;