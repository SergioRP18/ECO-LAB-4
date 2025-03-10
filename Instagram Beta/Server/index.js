import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

export const db = {
    users: [],
    posts: [],
};

app.get("/users", (req, res) => {
    res.json(db.users);
});

app.post("/register", (req, res) => {
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
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Campos obligatorios." });
    }

    const user = db.users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Datos incorrectos." });
    }

    res.json({ user });
});

app.post("/posts", (req, res) => {
    const { username, nickname, url, title, description } = req.body;

    if (!username || !nickname || !url || !title || !description) {
        return res.status(400).json({ message: "Campos obligatorios." });
    }

    db.posts.push({ username, nickname, url, title, description });

    res.status(201).json({ message: "El post se creó con éxito." });
});


app.listen(5050, () => {
    console.log("Servidor corriendo en http://localhost:5050");
});
