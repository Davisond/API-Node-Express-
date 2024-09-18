const dogosModel = require('../models/dogosModel');

const getDogos = async (request, response) => {
    const dogos = await dogosModel.getDogos();
    return response.status(200).json(dogos);
}

const createDog = async (request, response) => {
    const createdDog = await dogosModel.createDog(request.body);
    return response.status(201).json(createdDog);
};

const deleteDog = async (request, response) => {

    
    const { id } = request.params;
    await dogosModel.deleteDog(id);
    return response.status(204).json();
}

const updateDog = async (request, response) => {

    const { id } = request.params;
    await dogosModel.updateDog(id, request.body);
    return response.status(204).json(); 
}



module.exports = {
getDogos,
createDog,
deleteDog, 
updateDog,
}