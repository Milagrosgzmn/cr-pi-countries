const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set (value){
        this.setDataValue('name', value.toLowerCase());
      },
    },
    flags:{
      type: DataTypes.ARRAY (DataTypes.STRING),
      allowNull: false,
    },
    continents:{
      type:  DataTypes.JSON,
      allowNull: false,
    },
    capital:{
      type:  DataTypes.JSON,
      defaultValue: 'No posee capital',
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
      defaultValue: 'No posee subregion',
    },
    area:{
      type: DataTypes.INTEGER,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
  },{timestamps: false});
};