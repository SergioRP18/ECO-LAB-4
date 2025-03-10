const formLogin = document.getElementById("login-user");

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("user-password").value.trim();

    if (!username || !password) {
        alert("Campos obligatorios.");
        return;
    }

    try {
        const result = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const response = await result.json();

        if (result.ok) {
            sessionStorage.setItem("loggedUser", JSON.stringify(response.user));
            alert("Bienvenido");
            window.location.href = "http://127.0.0.1:3000/ClientCreate/CreatePost/create.html";
        } else {
            alert(response.message || "Datos incorrectos.");
        }
    } catch (error) {
        console.log("Error al loggearse", error);
        alert("Error con el servidor.");
    }
});
