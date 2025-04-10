document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:5050"); // Conectar al servidor

    const formPost = document.getElementById("create-post");

    formPost.addEventListener("submit", async (event) => {
        event.preventDefault();

        const url = document.getElementById("url").value.trim();
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description-post").value.trim();

        if (!url || !title || !description) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Inicia sesión para crear post.");
            return;
        }

        const newPost = {
            username: loggedInUser.username,
            nickname: loggedInUser.nickname,
            url,
            title,
            description,
        };

        socket.emit("newPost", newPost);

        alert("Post enviado al servidor.");
    });

    socket.on("postAdded", (post) => {
        console.log("Nuevo post agregado:", post);
    });
});
