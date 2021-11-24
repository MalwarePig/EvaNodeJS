const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../controllers/UserController');

/////////////////////////////////////////////////////////////////////////// USUARIOS /////////////////////////////////////////////////////////////////////////////////
//Acceder a login
router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('index.html');
});

//Iniciar logueo
router.get('/Login', (req, res) => {
	//res.send('holoo');
	res.render('Login/LoginAdmin.html');
});

//Acceder formulario Registrar usuario

//Iniciar logueo
router.get('/Signup',  UserController.SignUp);
 
//Registrar usuario en db
router.post('/AddUser', UserController.save);

//Eliminar usuario en db
router.post('/EliminarUsuario', UserController.EliminarUsuario);

router.get('/LogueoActivo', (req, res) => {
	//res.send('holoo');
	console.log(req.session.area)
	res.json(req.session.area);
});

/////////////////////////////////////////////////////////////////////////// ENTRAR A HOME ///////////////////////////////////////////////////////////////////////////////
//Carga pagina principal
router.get('/home', UserController.HOME);

/////////////////////////////////////////////////////////////////////////// ENTRAR A cPlaner /////////////////////////////////////////////////////////////////////////////







module.exports = router;

/*ESTA ES UNA VERSION DIRECTA SIN VERIFICAR LOGIN
router.get('/home', (req, res) => {
    //res.send('holoo');
    res.render('index.html',{title: 'Gemak'});
});*/

/*router.get('/Maquinas', (req, res) => {
    res.render('Maquinas.html',{title: 'Maquinas'});
});*/

/*
//rutas
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname,'/views/index.html'));//Obtiene ruta de este archiv Js + ruta del archivo a mostrar
    //console.log(__dirname);//Muestra ruta generica de archivo que lo ejecuta
    //console.log(path.join(__dirname,'views/index.html'));
    res.render('index',{title: 'Gemak'});
});
*/


/////////////////////////////////////////////////////////////////////////// Materiales //////////////////////////////////////////////////////////////////////////////
/* router.get('/CargaMateriales', (req, res) => {
	if (req.session.loggedin) {

		res.render('Materiales/Entrada.html', {
			title: 'Gemak'
		});
	} else {
		res.render('Admin/Login.html');
	}
	res.end();
});

//====== Guardar Materiales ========
router.post('/CargaMaterial', MaterialesController.CargaMaterial);
//====== Carga Lista Materiales ========
router.get('/listaMateriales', MaterialesController.listaMateriales);
 
/////////////////////////////////////////////////////////////////////////// Proceso //////////////////////////////////////////////////////////////////////////////
//====== Cargar Reporte Inventario ========
router.get('/VerInventario', (req, res) => {
	if (req.session.loggedin) {
		res.render('Proceso/ReporteInventario.html', {
			title: 'Gemak'
		});
	} else {
		res.render('Admin/Login.html');
	}
	res.end();
});
 */