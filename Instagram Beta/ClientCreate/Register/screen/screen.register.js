import {navigateTo} from "../register.js";

export default function RegisterScreen() {

    const registerButton = document.getElementById("button-register");

    registerButton.addEventListener("click", () =>{
        navigateTo("/login");
    })
};