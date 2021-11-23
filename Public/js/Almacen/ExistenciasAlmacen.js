var DataFamilias = [];
var DataCategorias = [];

function CargarAlmacen() {
    var listPlantas = document.getElementById("Almacen");
    let Plantas = ['Todo', 'Bravo', 'Morelos', 'Gaveta','AlmacenExtra'];
    for (let i = listPlantas.options.length; i >= 0; i--) { //Borrar elementos option de select
        listPlantas.remove(i);
    }

    for (var i = 0; i < Plantas.length; i++) { //Agregar nuevos options del select
        var option = document.createElement("option");
        option.text = Plantas[i];
        listPlantas.add(option);
    }
}
 
function CargarCategorias() {
    var listCategoria = document.getElementById("Categoria");
     
    for (let i = listCategoria.options.length; i >= 0; i--) { //Borrar elementos option de select
        listCategoria.remove(i);
    }

    var option = document.createElement("option");
    option.text = "Todo";
    listCategoria.add(option);

    for (var i = 0; i < DataCategorias.length; i++) { //Agregar nuevos options del select

        var option = document.createElement("option");
        option.text = DataCategorias[i];
        listCategoria.add(option);
    }
}


/*
function CargarFamilias() {

    var listFamilia = document.getElementById("Familia");
    var Almacen = document.getElementById("Almacen").value;
    let FamiliasMorelos = ['Torno', 'Acabado', 'Centro maquinado', 'Endmills', 'Machuelos', 'Rimas', 'Brocas', 'Produccion', 'Seguridad', 'Embarque', 'Mantenimiento', 'ULINE', 'Otros']
    let FamiliasBravo = ['John Deere', 'Acabado', 'Nidec', 'Nidec ACEM', 'Tornos Ch ACME', 'Tornos', 'Centro maquinado', 'Machuelos', 'Endmills', 'Rimas', 'Brocas', 'Produccion', 'Embarque', 'Seguridad', 'Mantenimiento']
    let FamiliasGaveta = ['Stock']

    for (let i = listFamilia.options.length; i >= 0; i--) { //Borrar elementos option de select
        listFamilia.remove(i);
    }

    var option = document.createElement("option");
    option.text = "Todo";
    listFamilia.add(option);

    if (Almacen == 'Morelos') {
        for (let i = 0; i < FamiliasMorelos.length; i++) {
            var option = document.createElement("option");
            option.text = FamiliasMorelos[i];
            listFamilia.add(option);
        }
    } else if (Almacen == 'Gaveta') {
        for (let i = 0; i < FamiliasGaveta.length; i++) {
            var option = document.createElement("option");
            option.text = FamiliasGaveta[i];
            listFamilia.add(option);
        }
    } else {
        for (let i = 0; i < FamiliasBravo.length; i++) {
            var option = document.createElement("option");
            option.text = FamiliasBravo[i];
            listFamilia.add(option);
        }
    }
}*/

function MostrarReporte() {
    var Categoria = document.getElementById("Categoria").value;
    var Almacen = document.getElementById("Almacen").value;
    var Familia = document.getElementById("Familia").value;

    $.ajax({
        url: '/ExistenciaTotalAlmacen/' + Almacen + '|' + Categoria + '|' + Familia,
        success: function (Herramientas) {
            //console.table(Herramientas)
            var Arreglo = [];
            //Limpiar tabla 
            var TablaAlmacen = document.getElementById('TablaReporte').getElementsByTagName('tbody')[0];
            var limite = TablaAlmacen.rows.length;
            var TotalHerramientas = Herramientas.length;

            for (var i = 0; i < limite; i++) {
                $("#Rows" + i).remove(); //elimina los elementos con id Rows
            }

            for (var i = 0; i < Herramientas.length; i++) {
                var id = Herramientas[i].id;
                var Clave = Herramientas[i].Clave || '-';
                var Producto = Herramientas[i].Producto;
                var Planta = Herramientas[i].Almacen;
                var StockNuevo = Herramientas[i].Stock;
                var StockUsado = Herramientas[i].StockUsado;
                var StockMinimo = Herramientas[i].StockMin;
                var StockMaximo = Herramientas[i].StockMax;
                var Ubicacion = Herramientas[i].Ubicacion;
                var Categoria = Herramientas[i].Categoria;
                var Familia = Herramientas[i].Familia;
                //Eliminar variable dentro del For

                Arreglo = [Clave, Producto, Herramientas[i].Almacen, StockNuevo, StockUsado, StockMinimo, StockMaximo, Ubicacion, Categoria, Familia]
                var TablaAlmacen = document.getElementById('TablaReporte').getElementsByTagName('tbody')[0];
                // inserta una fila al final de la tabla
                var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {

                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "Rows" + i); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);
                } //fin de for de columnas
            } //fin de for de filas

        } //Funcion success
    }); //Ajax
}




function ExportarExcel() {
    var tabla = document.getElementById("TablaReporte");
    var total = tabla.rows.length //Total de filas


    var sheet_1_data = [];
    for (var j = 0; j <= (total - 1); j++) { //filas
        //var dato = tabla.rows[j].cells[h].childNodes[0].nodeValue;

        var Clave = tabla.rows[j].cells[0].childNodes[0].nodeValue;
        var Producto = tabla.rows[j].cells[1].childNodes[0].nodeValue;
        var Almacen = tabla.rows[j].cells[2].childNodes[0].nodeValue;
        var Stock = tabla.rows[j].cells[3].childNodes[0].nodeValue;
        var StockMin = tabla.rows[j].cells[4].childNodes[0].nodeValue;
        var StockMax = tabla.rows[j].cells[5].childNodes[0].nodeValue;
        var StockUsado = tabla.rows[j].cells[6].childNodes[0].nodeValue;
        var Ubicacion = tabla.rows[j].cells[7].childNodes[0].nodeValue;
        var Categoria = tabla.rows[j].cells[8].childNodes[0].nodeValue;
        var Familia = tabla.rows[j].cells[9].childNodes[0].nodeValue;
        var Fila = [Clave, Producto, Almacen, Stock, StockMin, StockMax, StockUsado, Ubicacion, Categoria, Familia]
        console.log((total - 1))
        sheet_1_data.push(Fila);
    } //fin filas

    var opts = [{
        sheetid: 'Hoja1',

    }];
    var result = alasql('SELECT * INTO XLSX("Reporte.xlsx",?) FROM ?', [opts, [sheet_1_data]]);
}


function ModalListas() {
    $("#ModalListas").modal();
}

function addCategoria() {
    let Nombre = document.getElementById("newCategoria").value;
    console.log("Categoria nueva: " + Nombre)
    let data = {
        Nombre: Nombre,
        Planta: 'General'
    }
 
    $.post("/addCategoria", // url
        {
            data
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
        });
    document.getElementById("newCategoria").value = "";
    getCategoria();
}

function addFamilia() {
    let Nombre = document.getElementById("newFamilia").value;
    let Planta = document.getElementById("AlmacenAdd").value;
    if (Planta == 'Todo') {
        alert("Selecciona una planta")
    } else {
        let data = {
            Nombre: Nombre,
            Planta: Planta
        }

        console.log(data)
        $.post("/addFamilia", // url
            {
                data
            }, // data to be submit
            function (objeto, estatus) { // success callback
                //console.log("objeto: " + objeto + "Estatus: " + estatus);
            });
        document.getElementById("newFamilia").value = "";
        getFamilias();
    }
}

function getCategoria() {
    DataCategorias = [];
    $.ajax({
        url: '/getCategoriaAlmacen/',
        success: function (data) {

            var Arreglo = [];
            //Limpiar tabla 
            var TablaAlmacen = document.getElementById('TablaCategorias').getElementsByTagName('tbody')[0];
            var limite = TablaAlmacen.rows.length;
            for (var i = 0; i < limite; i++) {
                $("#RowsCat").remove(); //elimina los elementos con id Rows
            }
            if (data.length == 0) {
                $("#Vacio").modal();
            }
            for (var i = 0; i < data.length; i++) {
                var Nombre = data[i].Nombre;

                //Eliminar variable dentro del For
                Arreglo = [Nombre]
                DataCategorias.push(Arreglo);
                var TablaAlmacen = document.getElementById('TablaCategorias').getElementsByTagName('tbody')[0];
                // inserta una fila al final de la tabla
                var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "RowsCat"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);

                    if (x == 0) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(1); //CREAR CELDA
                        newCell.innerHTML = '<button id="Cat' + i + '" class="btn btn-warning" name="btn" onclick= EliminarCategoria("' + Arreglo[0] + '")> <i class="fas fa-user-slash"></i></button>';
                    }
                } //fin de for de columnas
            } //fin de for de filas
        } //Funcion success
    }); //Ajax
} //Evento clic


function getFamilias() {
    DataFamilias = [];
    $.ajax({
        url: '/getFamiliasAlmacen/',
        success: function (data) {

            var Arreglo = [];
            //Limpiar tabla 
            var TablaAlmacen = document.getElementById('TablaFamilias').getElementsByTagName('tbody')[0];
            var limite = TablaAlmacen.rows.length;
            for (var i = 0; i < limite; i++) {
                $("#RowsFam").remove(); //elimina los elementos con id Rows
            }
            if (data.length == 0) {
                $("#Vacio").modal();
            }
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var Nombre = data[i].Nombre;
                var Planta = data[i].Planta;

                //Eliminar variable dentro del For
                Arreglo = [id, Nombre, Planta]
                DataFamilias.push(Arreglo)

                var TablaAlmacen = document.getElementById('TablaFamilias').getElementsByTagName('tbody')[0];
                // inserta una fila al final de la tabla
                var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                for (var x = 0; x < (Arreglo.length - 1); x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "RowsFam"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[(x + 1)]);
                    newCell.appendChild(newText);
                    if (x == 1) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(2); //CREAR CELDA
                        newCell.innerHTML = '<button id="Fam' + i + '" class="btn btn-warning" name="btn" onclick= EliminarFamilia("' + Arreglo[0] + '")> <i class="fas fa-user-slash"></i></button>';
                    }
                } //fin de for de columnas
            } //fin de for de filas
            console.table({
                DataFamilias
            })
            FiltroFamilia();
        } //Funcion success
    }); //Ajax
 
} //Evento clic

function CargarListasModal() {
    getCategoria();
    getFamilias();
    FiltroFamilia();
    CargarAlmacen();
}

function EliminarCategoria(Nombre) {
    console.log(Nombre)
    let data = {
        Nombre: Nombre
    }
    $.post("/EliminarCategoria", // url
        {
            data
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                getCategoria();
            }
        });
}

function EliminarFamilia(id) {
    console.log(id)
    let data = {
        ID: id
    }
    $.post("/EliminarFamiliaAlmacen", // url
        {
            data
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                getFamilias();
            }
        });
}



function FiltroFamilia() {
    console.clear();
    console.table({DataFamilias})
    var listPlanta = document.getElementById("Almacen").value;
    var listFamilia = document.getElementById("Familia");

    var Resultado = []
    for (let index = 0; index < DataFamilias.length; index++) {
        if (DataFamilias[index][2] == listPlanta) {
            Resultado.push(DataFamilias[index])
        }
    }

    console.table({Resultado})

    for (let i = listFamilia.options.length; i >= 0; i--) { //Borrar elementos option de select
        listFamilia.remove(i);
    }

    var option = document.createElement("option");
    option.text = "Todo";
    listFamilia.add(option);

    for (let i = 0; i < Resultado.length; i++) {
        var option = document.createElement("option");
        option.text = Resultado[i][1];
        listFamilia.add(option);
    }
}