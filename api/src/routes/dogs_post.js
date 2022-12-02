const { Router } = require('express');
const { Dog, Temperament } = require('../db')

const router = Router();

router.post('/', async (req, res) => {
    try {
        let { name, height, weight, life_span, image, createInDb, temperament } = req.body;//le pido al body las propiedades que necesito
        let newDog = await Dog.create({name, height, weight, life_span, image, createInDb});

        let tempsDb = await Temperament.findAll({//dentro del modelo Temperament(tiene todos)
            where: { name: temperament }//encontrá todas los temps que coincidan con las props que le paso por body
        })

        newDog.addTemperament(tempsDb);
        res.status(200).send(newDog)
    } catch (error) {
        res.status(404).send("No pudimos crear la raza... Verifique que sean los valores adecuados!")
    }
})

module.exports = router