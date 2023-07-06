const {TouristActivities} = require('../../db');
const {Countries} = require('../../db');

const postActivity = async (req, res)=>{

    const {nombre, dificultad, duracion, temporada, CountryId} = req.body;

    try {
        if (nombre && dificultad && temporada && CountryId) {

            const [newActivity] = await TouristActivities.findOrCreate({
                where: { nombre: nombre },
                defaults: {
                    dificultad,
                    duracion,
                    temporada,
                },
            });
            CountryId.map ( async id =>{
                const newCountry = await Countries.findOne({where:{id:id}});
                 await newActivity.addCountries(newCountry.id);
            });

            return res.status(200).send('Se creó la actividad con exito');

        }
        return res.status(400).send('Faltan datos');
        
    } catch (error) {
        return res.status(500).send({error: error.message});
    }

};

module.exports = postActivity;