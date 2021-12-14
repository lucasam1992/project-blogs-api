const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const create = rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await usersService.createUser(displayName, email, password, image);
    
    if (user.message) return res.status(user.code).json({ message: user.message });
    
    return res.status(201).json({ token: user.token });
});

const getAllUser = rescue(async (_req, res) => {
    const users = await usersService.getAllUser();

    res.status(200).json(users);
});

const getUserById = rescue(async (req, res) => {
    const { id } = req.params;

    const users = await usersService.getUserById(id);

    if (!users) return res.status(404).json({ message: 'User does not exist' });

    res.status(200).json(users);
});

const deleteUser = rescue(async (req, res) => {
    const user = req.payload;
    
    console.log(user);
    
    await usersService.deleteUser(user.id);

    return res.status(204).json();
});

module.exports = {
    create,
    getAllUser,
    getUserById,
    deleteUser,
};