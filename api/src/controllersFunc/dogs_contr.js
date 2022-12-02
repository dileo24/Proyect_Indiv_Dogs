const axios = require('axios');
require('dotenv').config();
const { key } = process.env;
const { Dog, Temperament } = require('../db')

const getApiInfo = async () => { //me trae la info de la api
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${key}`)//uso async await porque no sé cuánto va a demorar la respuesta
  const apiInfo = await apiUrl.data.map(elem => {//entonces le aviso que espere a la respuesta antes de cargarle info a las constantes(asíncrona)

    let w = elem.weight.metric.split(' - ').length === 2
      ? (parseInt(elem.weight.metric.split(' - ')[0]) + parseInt(elem.weight.metric.split(' - ')[1])) / 2
      : parseInt(elem.weight.metric)

    let h = elem.height.metric.split(' - ').length === 2
      ? (parseInt(elem.height.metric.split(' - ')[0]) + parseInt(elem.height.metric.split(' - ')[1])) / 2
      : parseInt(elem.height.metric)

    return {
      id: elem.id,
      name: elem.name,
      weight: Math.round(w),
      height: Math.round(h),
      life_span: elem.life_span,
      image: elem.image.url,
      temperament: elem.temperament
    }
  });
  return apiInfo;
}

const getDbInfo = async () => {//me trae la info de la base de datos
  return Dog.findAll({//trae todos los perros y necesito incluirle los temperamentos
    include: {
      model: Temperament, //incluime el modelo temperamento para que haga la relación entre los dos modelos
      attributes: ['name'],//trayendo el atributo nombre
      through: {//mediante los siguientes atributos
        attributes: [],
      }
    }
  })
}

const getAllDogs = async () => { //funcion para concatenar 
  const apiInfo = await getApiInfo();//traigo lo de la api
  let dbInfo = await getDbInfo();//traigo lo de la base de datos
  dbInfo = dbInfo.map(elem => {

    return {
      id: elem.id,
      name: elem.name,
      weight: elem.weight,
      height: elem.height,
      life_span: elem.life_span,
      image: elem.image,
      temperament: elem.temperaments
        .map((t) => { return t.name; })
        .join(", "),
      createInDb: elem.createInDb
    }
  });

  const infoTotal = apiInfo.concat(dbInfo);//uno toda la info en forma de arreglo
  return infoTotal;
}

module.exports = { getAllDogs };
