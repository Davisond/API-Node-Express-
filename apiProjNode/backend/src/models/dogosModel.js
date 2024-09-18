const connection = require('./connection'); 

//GET 
const getDogos = async () => {
    const [dogos] = await connection.execute('SELECT * FROM dogos');
    return dogos;
}
//POST
const createDog = async (dogo) => {
    const { name, status } = dogo;
    const query = 'INSERT INTO dogos(name, status) VALUES (?, ?)';
    const [createdDog] = await connection.execute(query, [name, status]);
    return createdDog;
}

//DELETE
const deleteDog = async (id) => {
    const removedDog = await connection.execute('DELETE FROM dogos WHERE id = ?', [id]);
    return removedDog;
}

//PUT
const updateDog = async (id, dogo) => {
    const { name , status } = dogo;
    const query = 'UPDATE dogos SET name = ?, status = ? WHERE id = ?';
    const updatedDog = await connection.execute(query, [name, status, id]);
    return updatedDog;
}


module.exports = {
    getDogos,
    createDog,
    deleteDog, 
    updateDog,
};