const {TouristActivities} = require('../../db');

const deleteActivity = async(req, res)=>{
    const {id} = req.params;

    try {
        if (id) {
             await TouristActivities.destroy({
                where:{
                    id:id,
                }
            });
            const activities = await TouristActivities.findAll();
            return res.status(200).send(activities);
        }
        return res.status(400).send('Faltan datos');
    } catch (error) {
        return res.status(500).json(error.message);
    }

};

module.exports = deleteActivity;