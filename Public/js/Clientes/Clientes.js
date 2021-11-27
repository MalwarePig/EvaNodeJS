/*============================================== Registrar Cliente ===============================================*/
function RegistrarCliente() {
    let dataCliente = {
        Nombre: document.getElementById("new_Nombre").value,
        Direccion: document.getElementById("new_Direccion").value,
        Telefono: document.getElementById("new_Telefono").value,
        Membresia: document.getElementById("new_Membresia").value,
        Nip: document.getElementById("new_Nip").value,
        Usuario: document.getElementById("new_Usuario").value,
        Contraseña: document.getElementById("new_Contraseña").value
    }
console.info(dataCliente)
    $.post("/RegistrarCliente", // inicia la lista de ot en el flujo de produccion
        {
            dataCliente
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                alert("Registro correcto");
                $('#FormularioCliente')[0].reset();
            }else{ 
                $('#FormularioCliente')[0].reset();
            }
        });
}

/*============================================== Cargar Clientes ===============================================*/
function CargarClientes() {
    $.ajax({
        url: '/CargarClientes',
        success: function (data) {
            console.log(data[0])
            $("#CuerpoClientes tr").remove();
            let TotalRegistros = data.length;
            var Tabla = document.getElementById('TablaClientes').getElementsByTagName('tbody')[0];
            for (let index = 0; index < TotalRegistros; index++) {
                let id = data[index].id;
                let Nombre = data[index].Name || '-';
                let Dirección = data[index].addres;
                let Telefono = data[index].phone;
                let Membresia = data[index].typeCard;
                let Nip = data[index].numberCard;
                let username = data[index].username;
                let pass = data[index].pass;
 
                let Arreglo = [id, Nombre,Dirección,Telefono,Membresia,Nip,username,pass];
                // inserta una fila al final de la tabla
                var newRow = Tabla.insertRow(Tabla.rows.length);
                for (var x = 0; x < (Arreglo.length + 1); x++) {

                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "ncRows" + index); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    if (x == 0) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="tableClienteid' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    } else if (x == 6) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="tableClienteUser' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    }  else if (x == 7) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="tableClientePass' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    } 
                     else if (x == 8) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(8); //CREAR CELDA
                        newCell.innerHTML = '<button id="' + index + '" class="btn btn-dark" name="btn" data-bs-toggle="modal" href="#modEditarCliente" onclick=Seleccion(' + (index + 1) + ')> <i class="fas fa-edit"></i> </button>'
                                           +'<button id="EliminarTi' + index + '" class="btn btn-danger" name="btn" onclick=EliminarTrabajoIn(' + (index + 1) + ')><i class="fas fa-minus-square"></i></button>'; 
                    } else {
                        var newText = document.createTextNode(Arreglo[x]);
                        newCell.appendChild(newText);
                    }
                } //fin de for de columnas
            } //document.getElementById("TotalMuerto").value = (data[0].TMUno + data[0].TMDos + data[0].TMTres);
        } //Funcion success
    }); //Ajax 
}



function Seleccion(x){

}