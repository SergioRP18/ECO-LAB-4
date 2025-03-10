
const credentialsForm = () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("user-password");

    const credentials = {
        username: usernameInput?.value?.trim(),
        password: passwordInput?.value,
    }

    users(credentials.username, credentials.password).then(username => {
        this.cre
    })

};