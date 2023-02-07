const userModels = require("./user.models")

const createUserQuery = async (data) => {
    const user = await userModels(data);
    await user.save();
};

// Obtener la informacion del usuario en sesion
const getUserQuery = async (_id) => {
    return await userModels.findById({ _id });
};

const getUsersNearbyQuery = async (user, distance = 1000) => {
    return await userModels.aggregate([
        {
            $geoNear: {
                // near => type de la ubicacion y las coordenadas
                near: {  type: user.location.type, coordinates: user.location.coordinates },
                // Ver los metros de distancia que hay entre el usuario en sesion y los demas usarios
                distanceField: "dist.calculated",
                 // La distancia maxima para la busqueda de usuarios (en metros)
                maxDistance: distance
            }
        },
        // No mostrar el usuario en sesion
        { $match: { _id: { $ne: user._id } } },
        // No mostrar la contraseña de los usuarios
        {
            $project: {
                password: 0
            }
        }
    ])
}

module.exports = {
    createUserQuery,
    getUserQuery,
    getUsersNearbyQuery
};