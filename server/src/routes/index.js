const { Router } = require("express");

const getCountries = require('../handlers/countriesHandlers/getCountries');
const getCountryById = require('../handlers/countriesHandlers/getCountryById');
const getCountriesByName = require('../handlers/countriesHandlers/getCountriesByName');
const getActivities = require('../handlers/activityHandlers/getActivities');
const postActivity = require('../handlers/activityHandlers/postActivity');
const deleteActivity = require('../handlers/activityHandlers/deleteActivity');

const router = Router();

router.get('/countries', getCountries);
router.get('/countries/name', getCountriesByName);
router.get('/countries/:countryId', getCountryById);

router.post('/activities', postActivity);
router.get('/activities', getActivities);
router.delete('/activities/:id', deleteActivity);

module.exports = router;
