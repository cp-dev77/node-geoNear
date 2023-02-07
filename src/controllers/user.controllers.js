const mongoose = require('mongoose');
const { createUserQuery, getUserQuery, getUsersNearbyQuery } = require("../models/user/user.query");

const createUserController = async (req, res) => {
    try {
        await createUserQuery(req.body);
        res.json('User created');
    } catch (error) {
        console.log(error);
        res.json('Internal server error');
    }
};

const getUsersNearbyController = async (req, res) => {
    try {
        const { _id, distance } = req.body;

        // El '_id' es de tipo String pero necesitamos convertirlo a un ObjectId de Mongo
        const user = await getUserQuery(mongoose.Types.ObjectId(_id));
        const usersNearby = await getUsersNearbyQuery(user, distance);

        res.json(usersNearby);

    } catch (error) {
        console.log(error);
        res.json('Internal server error');
    }
}

module.exports = {
    createUserController,
    getUsersNearbyController
};