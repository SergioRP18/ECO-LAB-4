const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors());

const db = {
    users: [],
    posts: [],
};
global.db = db;

app.use(userRoutes);
app.use(postRoutes);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("newPost", (post) => {
        console.log("Nuevo post recibido:", post);
        db.posts.push(post); 
        io.emit("postAdded", post);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

server.listen(5050, () => {
    console.log("Servidor corriendo en http://localhost:5050");
});
