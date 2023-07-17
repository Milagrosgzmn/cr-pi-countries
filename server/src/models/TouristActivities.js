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
        },
        set (value){
          this.setDataValue('dificultad', Number(value));
        },
    },
    duracion:{
        type:DataTypes.INTEGER,
        set (value){
          this.setDataValue('duracion', Number(value));
        },
    },
    temporada:{
        type: DataTypes.ENUM,
        values: ['verano', 'otoño', 'invierno', 'primavera'],
        allowNull: false,
        set (value){
          this.setDataValue('temporada', value.toLowerCase());
        },
    }
  },{timestamps: false});
};