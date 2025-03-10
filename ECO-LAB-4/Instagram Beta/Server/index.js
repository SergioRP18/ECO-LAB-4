import { request } from "http";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

export const db = {
    users: [],
    posts: [],
}


app.get("/users", (request, response) => {
    response.send(db);
});

app.post("/register", (request, response) => {
    const {body} = request;
    db.users.push(body);

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Usuario existente." });
    }

    users.push({username, nickname, password});

    response.status(201).send(body);
});

app.post("/login", (request, response) => {
    const {username, password} = request.body;

    const user = users.find(user => user.username === username && user.password === password);

    if(!user){
        return response.status(401).json({message: "Datos incorrectos."});
    }
    response.json({user});
});

app.post("/posts", (request, response) => {
    const {username, nickname, url, title, description} = request.body;

    posts.push ({
        username,
        nickname,
        url,
        title,
        description
    });

    response.status(201).json({ message: "El post se creó con éxito."});
})


app.listen(5050);