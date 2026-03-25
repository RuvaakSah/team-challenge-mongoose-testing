const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST /create
router.post('/create', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send({ message: "Faltan campos obligatorios" });
    }
});

// GET / (Todas las publicaciones)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// EXTRA: GET /postsWithPagination (De 10 en 10)
router.get('/postsWithPagination', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const posts = await Post.find()
            .limit(10)
            .skip((page - 1) * 10);
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /id/:_id
router.get('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        res.send(post);
    } catch (error) {
        res.status(404).send({ message: "ID no encontrado" });
    }
});

// GET /title/:title
router.get('/title/:title', async (req, res) => {
    try {
        const posts = await Post.find({ title: req.params.title });
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT /id/:_id
router.put('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE /id/:_id
router.delete('/id/:_id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params._id);
        res.send({ message: "Post eliminado con éxito" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;