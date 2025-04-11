import {navigateTo} from "../login.js";

export default function LoginScreen() {
    const loginButton = document.getElementById("login-action");

    loginButton.addEventListener("click", () =>{
        navigateTo("/create");
    });
};


