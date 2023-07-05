const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('TouristActivities', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min:1,
            max:5,
        }
    },
    duracion:{
        type:DataTypes.INTEGER,
    },
    temporada:{
        type: DataTypes.ENUM,
        values: ['verano', 'otoño', 'invierno', 'primavera'],
        allowNull: false,
    }
  },{timestamps: false});
};