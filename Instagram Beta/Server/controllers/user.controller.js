const db = require("../db");

exports.getUsers = (req, res) => {
    res.json(db.users);
};

exports.registerUser = (req, res) => {
    const { username, nickname, password } = req.body;

    if (!username || !nickname || !password) {
        return res.status(400).json({ message: "Campos obligatorios." });
    }

    const existingUser = db.users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Usuario existente." });
    }

    db.users.push({ username, nickname, password });
    res.status(201).json({ message: "Usuario registrado con éxito." });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Campos obligatorios." });
    }

    const user = db.users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Datos incorrectos." });
    }

    res.json({ user });
};