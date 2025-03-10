document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-user");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("user").value.trim();
        const nickname = document.getElementById("nickname").value.trim();
        const password = document.getElementById("register-password").value.trim();

        if (!username || !nickname || !password) {
            alert("Campos obligatorios.");
            return;
        }

        try {
            const result = await fetch("http://localhost:5050/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, nickname, password }),
            });

            const response = await result.json();

            if (result.ok) {
                alert("Se ha registrado exitosamente.");
                window.location.href = "http://127.0.0.1:3000/ClientCreate/Login/login.html";
            } else {
                alert(response.message || "Error al registrar.");
            }
        } catch (error) {
            console.error("Error de registro", error);
            alert("Error del servidor.");
        }
    });
});