const db = require("../db");

exports.getPosts = (req, res) => {
    res.json(db.posts);
};

exports.createPost = (req, res) => {
    const { username, nickname, url, title, description } = req.body;

    if (!username || !nickname || !url || !title || !description) {
        return res.status(400).json({ message: "Campos obligatorios." });
    }

    const newPost = { username, nickname, url, title, description };
    db.posts.push(newPost);

    const io = require("../index").io;
    io.emit("postAdded", newPost);

    res.status(201).json({ message: "El post se creó con éxito." });
};