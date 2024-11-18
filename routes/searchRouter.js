const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();
router.get('/home', searchController.getHome);


router.get('/searches', searchController.getAllSearches);
router.get('/search/:id', searchController.getSearchById);
router.post('/search', searchController.createSearch);
router.put('/search/:id', searchController.updateSearch);
router.delete('/search/:id', searchController.deleteSearch);

module.exports = router;
