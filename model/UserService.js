let { getMongoData, insertMongoData, updateMongoData, deleteMongoData } = require('../utils/pool');

function getUserList() {
    return getMongoData('react', 'user');
}

function getUserByName(name) {
    return getMongoData('react', 'user', {name: name});
}

function insertUser(user) {
    return insertMongoData('react', 'user', user)
}

function updateUser(id, user) {
    return updateMongoData('react', 'user', {id: id}, user);
}

function deleteUser(id) {
    return deleteMongoData('react', 'user', {id: id});
}

module.exports = {
    getUserList,
    getUserByName,
    insertUser,
    updateUser,
    deleteUser
};