const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const dogsMiddleware = require('./dogs_get');
router.use('/dogs', dogsMiddleware);

const tempsMiddleware = require('./temp_get');
router.use('/temperaments', tempsMiddleware);

const dogsPostMiddleware = require('./dogs_post');
router.use('/dog', dogsPostMiddleware);

module.exports = router;
