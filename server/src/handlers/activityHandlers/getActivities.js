const {TouristActivities} = require('../../db');
const {Countries} = require('../../db');

const getActivities = async (req, res)=>{

    try {
        const activities = await TouristActivities.findAll({
            include: [{
                model: Countries,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
              }],
        })

        return res.status(200).send(activities);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};

module.exports = getActivities;