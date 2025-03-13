document.addEventListener("DOMContentLoaded", () => {
    const formPost = document.getElementById("create-post");

    formPost.addEventListener("submit", async (event) => {
        // Primero prevenimos el envío del formulario
        event.preventDefault();

        // Obtenemos los valores de los campos
        const url = document.getElementById("url").value.trim();
        const title = document.getElementById("title").value.trim(); 
        const description = document.getElementById("description-post").value.trim(); 

        // Verificar si los campos están vacíos
        if (!url || !title || !description) {
            alert("Todos los campos son obligatorios.");
            return; // Si algún campo está vacío, se termina la ejecución.
        }

        // Verificar si el usuario está logueado
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedUser"));
        if (!loggedInUser) {
            alert("Inicia sesión para crear post.");
            return; // Si no hay un usuario logueado, no se sigue con el envío.
        }

        try {
            // Enviar los datos al servidor
            const result = await fetch("http://localhost:5050/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: loggedInUser.username,
                    nickname: loggedInUser.nickname,
                    url,
                    title,
                    description
                })
            });

            const response = await result.json();

            if (result.ok) {
                alert("Publicación exitosa");
            } else {
                alert(response.message || "No se pudo publicar el post. Intenta de nuevo");
            }
        } catch (error) {
            console.error("Error. Intenta de nuevo", error);
            alert("Error 400");
        }
    });
});
