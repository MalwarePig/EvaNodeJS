
function Login() {
    let username = document.getElementById("username").value;
    let pass = document.getElementById("pass").value;

    let data = {
        username: username,
        pass: pass
    }

    console.log(data)
    $.post("/Login", // inicia la lista de ot en el flujo de produccion
        {
            data
        }, // data to be submit
        function (respuesta, estatus) { // success callback
            console.log("respuesta: " + + " Estatus: " + estatus);
            $('#ModalLogin').modal('toggle');
            if (respuesta == null) {
                alert("No existe usuario")
            } else if (false) {
                alert("Error en usuario o contraseña")
            } else {//login
                //document.getElementById("logUser").innerHTML = respuesta;
                transformarMenu(respuesta)
            }
        });
}

function transformarMenu(respuesta) {
    if (respuesta.level == 'admin') {
        var MenuPrincipal = document.getElementById("MenuPrincipal");
        MenuPrincipal.removeChild(MenuPrincipal.childNodes[7])//nodo de login

        //LINK DE ADMIN
        let link = document.createElement("a"); //Creo un nuevo div para la nueva tarjeta
        link.setAttribute('class', 'nav-link');
        link.setAttribute('href', '/Panel');
        link.id = "li-Admin";
        link.innerHTML = respuesta.username;

        let li = document.createElement("li"); //Creo un nuevo div para la nueva tarjeta
        li.id = "li-Admin";
        li.setAttribute('class', 'nav-item');
        li.appendChild(link);
        document.getElementById("MenuPrincipal").appendChild(li);

        //LINK logout
        let linkLogout = document.createElement("a"); //Creo un nuevo div para la nueva tarjeta
        linkLogout.setAttribute('class', 'nav-link');
        linkLogout.setAttribute('href', "/");
        linkLogout.id = "li-Logout";
        linkLogout.innerHTML = 'Salir';

        let liLogout = document.createElement("li"); //Creo un nuevo div para la nueva tarjeta
        liLogout.id = "li-Logout";
        liLogout.setAttribute('class', 'nav-item');
        liLogout.appendChild(linkLogout);
        document.getElementById("MenuPrincipal").appendChild(liLogout);
    }else if(respuesta.level == 'Cliente'){
         //LINK DE USUARIO
         let link = document.createElement("a"); //Creo un nuevo div para la nueva tarjeta
         link.setAttribute('class', 'nav-link');
         link.setAttribute('href', '/Perfil');
         link.id = "li-Admin";
         link.innerHTML = respuesta.username;
 
         let li = document.createElement("li"); //Creo un nuevo div para la nueva tarjeta
         li.id = "li-Admin";
         li.setAttribute('class', 'nav-item');
         li.appendChild(link);
         document.getElementById("MenuPrincipal").appendChild(li);
 
         //LINK logout
         let linkLogout = document.createElement("a"); //Creo un nuevo div para la nueva tarjeta
         linkLogout.setAttribute('class', 'nav-link');
         linkLogout.setAttribute('href', "/");
         linkLogout.id = "li-Logout";
         linkLogout.innerHTML = 'Salir';
 
         let liLogout = document.createElement("li"); //Creo un nuevo div para la nueva tarjeta
         liLogout.id = "li-Logout";
         liLogout.setAttribute('class', 'nav-item');
         liLogout.appendChild(linkLogout);
         document.getElementById("MenuPrincipal").appendChild(liLogout);
    }


}




