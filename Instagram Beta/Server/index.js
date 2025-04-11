const express = require("express");
const path = require("path");
const { createServer } = require("http");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { initSocketInstance } = require("./services/socket.service");

const PORT = 5050;

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use("/ClientCreate", express.static(path.join(__dirname, "../ClientCreate")));
app.use("/ClientView", express.static(path.join(__dirname, "../ClientView")));

app.use("/", userRoutes);
app.use("/", postRoutes);

initSocketInstance(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
