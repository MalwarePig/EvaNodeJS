const Controller = {};
 
Controller.RegistrarCliente = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
 
            let Nombre = Object.values(data)[0].Nombre;
            let Direccion = Object.values(data)[0].Direccion;
            let Telefono = Object.values(data)[0].Telefono;
            let Membresia = Object.values(data)[0].Membresia;
            let Nip = Object.values(data)[0].Nip;
            let Usuario = Object.values(data)[0].Usuario;
            let Contraseña = Object.values(data)[0].Contraseña;
  
            console.log(Nombre,Direccion,Telefono,Membresia,Nip)

            conn.query("call newCustomer('"+Nombre+"','"+Direccion+"','"+Telefono+"','"+Membresia+"','"+Nip+"','"+Usuario+"','"+Contraseña+"');", true, (err, rows, fields) => {
                if (err) {
                    console.log('Error al descontar almacen' + err);
                }else{

                }
            });
             
        });
    } else {
        res.render('Admin/Login.html');
    }
};
 

Controller.CargarClientes = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {

            conn.query("call CargarClientes();", true, (err, rows, fields) => {
                if (err) {
                    console.log('Error al descontar almacen' + err);
                }else{
                    console.log(rows[0])
                    res.json(rows[0])                
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};
module.exports = Controller;