const {Countries} = require('../../db');
const { Op } = require("sequelize");

const getCountriesByName = async (req, res)=>{
    const {name} = req.query;
    
    try {
        const countries = await Countries.findAll({
            where: {
                name:{
                    [Op.substring]: name,
                },
            }
        });
        if (countries.length>0) {
            return res.status(200).json(countries);
        }
        return res.status(400).send('No se encontraron paises con ese nombre');
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getCountriesByName;