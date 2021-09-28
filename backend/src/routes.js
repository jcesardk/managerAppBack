const express = require('express');
const userController = require('./controller/userController');
const appController = require('./controller/appController');
const Aplicativo = require('./model/applicativo');
const perfilController = require('./controller/perfilController');

const routes = express.Router();

routes.get('/', function(req, res){
    res.json({messenger: "Bem vindo ao MongoDB"})
})

//Dados de users
routes.get('/user', userController.index);
routes.post('/user', userController.criaUsers);
routes.get('/user/:_id', userController.listaId);
routes.delete('/user/:_id', userController.excluir);
routes.put('/user', userController.updateUsers);

//Associa App ao usuario
routes.post('/associarApp', userController.associarAppUsario);


//Dados de aplicativos
routes.post('/aplicativo', appController.criaApp);
routes.get('/aplicativo', appController.listaApps);
routes.put('/aplicativo', appController.updateApp);
routes.get('/aplicativo/:_id', appController.listaId);
routes.delete('/aplicativo/:_id', appController.excluir);

//Dados de perfil
routes.post('/perfil', perfilController.criaPerfil);
routes.get('/perfil', perfilController.listaPerfil);
routes.put('/perfil', perfilController.updatePerfil);
routes.get('/perfil/:_id', perfilController.listaId);
routes.delete('/perfil/:_id', perfilController.excluir);

module.exports = routes;