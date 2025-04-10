document.addEventListener("DOMContentLoaded", () => {

    const socket = io("http://localhost:5050"); // Conectar al servidor

    const resultado = document.getElementById("resultado"); 
    const resultadoPosts = document.getElementById("resultado-posts"); 
    const btnUsuarios = document.getElementById("btnUsuarios"); 
    const btnPublicaciones = document.getElementById("btnPublicaciones"); 


    if (!resultado || !resultadoPosts || !btnUsuarios || !btnPublicaciones) {
        console.error("Error: No se encontraron los elementos en el DOM."); 
        return;
    }

    
    btnUsuarios.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:5050/users");
            if (!response.ok) throw new Error("Error al obtener los usuarios."); 

            const users = await response.json();

            if (users.length === 0) {
                resultado.innerHTML = "<p>No hay usuarios registrados.</p>";
                return;
            }

            resultado.innerHTML = users.map(user => `<p><strong>${user.nickname}</strong> (@${user.username})</p>`).join("");

        } catch (error) {
            console.error("Error al obtener usuarios:", error); 
            resultado.innerHTML = "<p>Error al cargar los usuarios.</p>";
        }
    });

    btnPublicaciones.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:5050/posts");
            if (!response.ok) throw new Error("Error al obtener las publicaciones.");

            const posts = await response.json(); 

            if (posts.length === 0) {
                resultadoPosts.innerHTML = "<p>No hay publicaciones disponibles.</p>";
                return;
            }

            resultadoPosts.innerHTML = posts.map(post => `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p><strong>Autor:</strong> ${post.nickname} (@${post.username})</p>
                    <p>${post.description}</p>
                    <img src="${post.url}" class="post-image" alt="Post image">
                </div>`).join("");

        } catch (error) {
            console.error("Error al obtener publicaciones:", error); 
            resultadoPosts.innerHTML = "<p>Error al cargar las publicaciones.</p>";
        }
    });

    socket.on("postAdded", (post) => {
        const newPostHTML = `
            <div class="post">
                <h3>${post.title}</h3>
                <p><strong>Autor:</strong> ${post.nickname} (@${post.username})</p>
                <p>${post.description}</p>
                <img src="${post.url}" class="post-image" alt="Post image">
            </div>`;
        resultadoPosts.innerHTML += newPostHTML;
    });
});
