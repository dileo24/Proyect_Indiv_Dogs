const { Router } = require('express');
const { allTemps } = require('../controllersFunc/temps_contr')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const temps = await allTemps();//llamo a la función al temps
        res.status(200).send(temps);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;