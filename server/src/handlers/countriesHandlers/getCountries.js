const axios = require('axios');
const {Countries, TouristActivities} = require('../../db');

const URL = 'http://localhost:5000/countries';

const getCountries = async (req, res) =>{
    try {
        const {data} = await axios(URL);
        if(data){   
            data.map(async pais =>{
                let flag;
                if(pais.flags.svg){
                    flag=pais.flags.svg;
                    
                }else{
                    flag=pais.flags.png;
                }
               await Countries.findOrCreate({
                where: { id:pais.cca3, },
                defaults: {
                    name:pais.translations.spa.common,
                    flags: flag,
                    continents:pais.continents,
                    capital:pais.capital,
                    subregion:pais.subregion,
                    area:pais.area,
                    population: pais.population,
                },
                
                });
            });
           
            let paises = await Countries.findAll({
                include: [{
                    model: TouristActivities,
                    attributes: ["nombre"],
                    through: {
                        attributes: [],
                    }
                  }],
            });
           return res.status(200).json(paises);
        }
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = getCountries;