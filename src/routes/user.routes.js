const { Router } = require('express');
const { createUserController, getUsersNearbyController } = require('../controllers/user.controllers');

const router = Router();

router.post('/', createUserController);

router.get('/usersNearby', getUsersNearbyController);

module.exports = router;