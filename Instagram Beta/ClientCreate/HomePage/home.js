import HomeScreen from "./screen/screen.home.js";

const socket = io("/", { path: "/real-time" });

let route = { path: "/home", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
    switch(currentRoute?.path){
        case "/home":
            HomeScreen(currentRoute?.data);
            break;
    }
};

function navigateTo(path, data) {
    route = { path, data };
    renderRoute(route);
  }

export { navigateTo, socket };