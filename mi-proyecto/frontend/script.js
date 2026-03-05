const API = "http://localhost:3000";

let token = localStorage.getItem("token") || null;


// función para hacer peticiones a la API
async function apiFetch(path, options = {}) {

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    const res = await fetch(API + path, {
        ...options,
        headers
    });

    const data = await res.json().catch(() => ({}));

    return { res, data };
}



// REGISTRO
async function register(){

    const identifier = document.getElementById("reg_user").value;
    const password = document.getElementById("reg_pass").value;

    const {res,data} = await apiFetch("/auth/register",{
        method:"POST",
        body:JSON.stringify({
            identifier,
            password
        })
    });

    if(res.ok){
        alert("Usuario creado correctamente");
    }else{
        alert(data.error || "Error en registro");
    }

}



// LOGIN
async function login(){

    const identifier = document.getElementById("log_user").value;
    const password = document.getElementById("log_pass").value;

    const {res,data} = await apiFetch("/auth/login",{
        method:"POST",
        body:JSON.stringify({
            identifier,
            password
        })
    });

    if(res.ok){

        token = data.token;

        localStorage.setItem("token",token);

        alert("Login correcto");

    }else{

        alert(data.error || "Login incorrecto");

    }

}



// CARGAR MENSAJES
async function loadMessages(){

    const {res,data} = await apiFetch("/messages");

    if(!res.ok) return;

    const wall = document.getElementById("wall");

    wall.innerHTML = "";

    data.forEach(m => {

        const div = document.createElement("div");

        div.textContent = m.user + " : " + m.text;

        wall.appendChild(div);

    });

}



// PUBLICAR MENSAJE
async function sendMessage(){

    const text = document.getElementById("msg").value;

    if(!text) return;

    const {res,data} = await apiFetch("/messages",{
        method:"POST",
        body:JSON.stringify({
            user:"alex",
            text
        })
    });

    if(res.ok){

        document.getElementById("msg").value = "";

        loadMessages();

    }else{

        alert("Error al enviar mensaje");

    }

}



// cargar mensajes al abrir la página
loadMessages();