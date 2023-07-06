const axios = require('axios');
const {Countries} = require('../../db');

const URL = 'http://localhost:5000/countries';

const getCountries = async (req, res) =>{
    try {
        const {data} = await axios(URL);
        if(data){   
            data.map(async pais =>{
               await Countries.findOrCreate({
                where: { id:pais.cca3, },
                defaults: {
                    name:pais.name.common,
                    flags: [pais.flags.png, pais.flags.svg],
                    continents:pais.continents,
                    capital:pais.capital,
                    subregion:pais.subregion,
                    area:pais.area,
                    population: pais.population,
                }
                });
            });
           
            let paises = await Countries.findAll();
           return res.status(200).json(paises);
        }
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = getCountries;