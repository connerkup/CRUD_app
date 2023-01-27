const express = require('express');
const router = express.Router();
const { createIdea, getIdeas, updateIdea, deleteIdea } = require('../db.js');

router.post('/create', (req, res) => {
    const { userId, idea_name, description } = req.body;
    createIdea(userId, idea_name, description)
        .then(() => res.send('Idea created!'))
        .catch(err => res.send(err));
});

router.get('/', (req, res) => {
    getIdeas()
        .then(ideas => res.json(ideas))
        .catch(err => res.send(err));
});

router.put('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const updates = req.body;
    updateIdea(ideaId, updates).then(result => {
        res.status(200).json({ ok: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ err: err });
    });
})

router.delete('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    deleteIdea(ideaId).then(result => {
        res.status(200).json({ ok: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ err: err });
    });
})

module.exports = router;
