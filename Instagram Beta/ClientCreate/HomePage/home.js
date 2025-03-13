document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-button').addEventListener('click', goToRegister);
    document.getElementById('login-button').addEventListener('click', goToLogin);

    async function goToRegister(event) {
        event.preventDefault(); 
        window.location.href = 'http://127.0.0.1:5500/Instagram%20Beta/ClientCreate/Register/register.html';
    }

    async function goToLogin(event) {
        event.preventDefault(); 
        window.location.href = 'http://127.0.0.1:5500/Instagram%20Beta/ClientCreate/Login/login.html';
    }
});
