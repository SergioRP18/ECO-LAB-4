import {navigateTo} from "../home.js";

export default function HomeScreen() {
    const loginButtonNavigate = document.getElementById("login-button");

    loginButtonNavigate.addEventListener("click", () => {
        navigateTo("/login");
    });

    const registerButtonNavigate = document.getElementById("register-button");

    registerButtonNavigate.addEventListener("click", () => {
        navigateTo("/register");
    });
};