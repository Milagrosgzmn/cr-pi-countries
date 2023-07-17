const {Countries, TouristActivities} = require('../../db');

const getCountryById = async (req, res)=>{
    const {countryId} = req.params;

    try {
        const country = await Countries.findOne({where:{id:countryId},
            include: [{
                model: TouristActivities,
                attributes: ["nombre"],
                through: {
                    attributes: [],
                }
              }],
            });
        if (country) {
            return res.status(200).json(country);
        }
        return res.status(400).send('Pais no encontrado');
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getCountryById;