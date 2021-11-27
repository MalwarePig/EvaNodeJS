const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../controllers/UserController');
const ClientesController = require('../controllers/ClientesController');

/////////////////////////////////////////////////////////////////////////// USUARIOS /////////////////////////////////////////////////////////////////////////////////
//Acceder a login
router.get('/', (req, res) => {
	res.render('index.html');
});

//Registrar usuario en db
router.post('/Login', UserController.Login);
 
 
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

//Carga pagina principal
router.get('/home', UserController.HOME);
/////////////////////////////////////////////////////////////////////////// Clientes ///////////////////////////////////////////////////////////////////////////////
//Crear Cliente
router.post('/RegistrarCliente', ClientesController.RegistrarCliente);
//Cargar Clientes
router.get('/CargarClientes', ClientesController.CargarClientes);
/////////////////////////////////////////////////////////////////////////// ENTRAR A PANEL ADMIN /////////////////////////////////////////////////////////////////////////////

router.get('/Panel', (req, res) => {
	//res.send('holoo');
	console.log(req.session.area)
	res.render('PanelAdmin/PanelAdmin.html',{title: 'EVA'});
});

router.get('/Calendario', (req, res) => {
	//res.send('holoo');
	console.log(req.session.area)
	res.render('Calendario/Calendario.html',{title: 'EVA'});
});





module.exports = router;
 