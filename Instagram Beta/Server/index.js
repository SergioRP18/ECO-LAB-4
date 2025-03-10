const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

export const db = {
    users: [],
}


app.get("/users", (request, response) => {
    response.send(db);
});

app.post("/user", (request, response) => {
    const {body} = request;
    db.users.push(body);

    response.status(201).send(body);
});


app.listen(5050);