const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, favoriteIdea, getFavorites, deleteUser } = require('../db.js');

// Create new user
router.post('/create', (req, res) => {
    const { name, username } = req.body;
    createUser(name, username)
        .then(() => res.send('User created!'))
        .catch(err => res.send(err));
});


// Get users
router.get('/', (req, res) => {
    getUsers()
        .then(users => res.json(users))
        .catch(err => res.send(err));
});


// Update user
router.put("/:userId", (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;

    updateUser(userId, updates)
        .then((result) => {
            res.status(200).json({ user: result.value });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ err: err });
        });
});

// Delete user
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    deleteUser(userId)
        .then((result) => {
            res.status(200).json({ deleted_docs: result.deletedCount});
        })
        .catch(err => res.status(500).json({ error: "Couldn't delete user" }));
});


// Favorite a specific idea for a specific user
router.put('/favorite', (req, res) => {
    const { userId, ideaId } = req.body;
    favoriteIdea(userId, ideaId)
        .then(() => res.send('Idea added to favorites!'))
        .catch(err => res.send(err));
});

// Get list of favorites for a specific user
router.get("/:userId/favorites", async (req, res) => {
    const userId = req.params.userId;
    const favorites = await getFavorites(userId);
    if (favorites) {
        res.status(200).json({ favorites });
    } else {
        res.status(500).json({ error: "Error getting favorites" });
    }
});

module.exports = router;
