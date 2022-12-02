const { Router } = require('express');
const { getAllDogs } = require('../controllersFunc/dogs_contr')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const name = req.query.name//busca si hay un 'name' por query(en la URL), '/dogs?:name'
        const totalDogs = await getAllDogs();

        if (name) {//si hay un query
            let dogName = await totalDogs.filter(//filtro la cte que tiene todos los dogs y filtro, buscando si
                elem => elem.name.toLowerCase().includes(name.toLowerCase())//cada nombre(elem.name) incluye el name que le pasé por query
            )
            if (dogName.length) {
                return res.status(200).send(dogName)
            } return res.status(404).send('No encontré a esa raza!')
        }
        else {//si no hay un query
            return res.status(200).send(totalDogs);//envío todos los perros 
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const totalDogs = await getAllDogs();
        if (id) {
            const raceId = await totalDogs.filter(elem => elem.id == (id))
            if (raceId.length) {
                return res.status(200).json(raceId)
            }
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;