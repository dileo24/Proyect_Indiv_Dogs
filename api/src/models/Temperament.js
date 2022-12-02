const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {//no hace falta crear id porque sequelize lo hace automáticamente
    name: {                       //porque únicamente vienen de un lado, no los creamos nosotros
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      timestamps: false,
    });
};
