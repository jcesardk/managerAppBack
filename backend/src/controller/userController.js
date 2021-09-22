const User = require ('../model/user');
var crypto = require ('crypto');
const Aplicativo = require('../model/applicativo');
const mongoose = require('mongoose');

module.exports = {

    //Entrega toda lista de usuarios já criados
    async index(req, res) {
        const usuarios = await User.find().populate('perfil').populate('aplicativos')
        res.json(usuarios);
    },

    //Lista um usuario pela ID
    async listaId(req, res) {
        const {_id} = req.params;
        const usuarios = await User.findOne({_id}).populate('perfil').populate('aplicativos');
        res.json(usuarios);
        
    },

    //Cria novos usuarios
    async criaUsers (req, res) {
        const {nome, senha, cpf, nascimento, rg, _idPerfil} = req.body;
        const senhaEncrypt = crypto.createHash('sha256').update(senha).digest('hex');


        const dataCreate = {
            nome, senha: senhaEncrypt, cpf, nascimento, rg, perfil: _idPerfil
        }

        //Metodo criado para tratar erro caso usuario já tenha sido criado
        try {
            if(await User.findOne({ cpf }))
            return res.status(400).send({ error: 'Usuario já existe'});
            
            const users = await User.create(dataCreate);

            users.senha = undefined;

            return res.send({ User });
            }catch (err){
            return res.status(400).send({ error: 'Falha no registro!'})
        }

    },

    //Exlui usuario e seus dados por ID
    async excluir(req, res){
        const {_id} = req.params
        const usuarios = await User.findByIdAndDelete({_id})
        res.json(usuarios);
    },

    //Atualiza dados de usuarios
    async updateUsers(req, res){
        const { _id, nome, senha, cpf, nascimento, rg, aplicativos} = req.body;
        let dataCreate = {}

        dataCreate = {
           nome, senha, cpf, nascimento, rg, aplicativos
        }
        const usuarios = await User.findByIdAndUpdate({_id}, dataCreate, {new: true})
        res.json(usuarios);
    },

    //Associa apps ao usuario
    async associarAppUsario(req, res){
        const {_idUser, _idApp } = req.body;

        const user = await User.findById(mongoose.Types.ObjectId(_idUser));
        const aplicativo = await Aplicativo.findById(mongoose.Types.ObjectId(_idApp));
        try {
            if(!aplicativo)
            return res.status(400).send({ error: 'Aplicativo inexistente'});
        }catch (err){
            return res.status(400).send({ error: 'Falha no registro!'})
        };

        try{
            if(!user)
            return res.status(400).send({ error: 'Usuario inexistente'})
        }catch (err) {
            return res.status(400).send({ error: 'Falha no registro'})
        };
        const appJaAssociado = user.aplicativos;

        if(appJaAssociado.length > 0){
            for(var index in appJaAssociado){
                const appRepeticao = appJaAssociado[index] + '';
                if(appRepeticao !== _idApp){
                    appJaAssociado.push(aplicativo);
                }
                
            }
        }else{
            appJaAssociado.push(aplicativo);
        }
        user.aplicativos = appJaAssociado;
        const usuarioEdited = await User.findByIdAndUpdate({"_id": mongoose.Types.ObjectId(_idUser)}, user);
        return res.status(202).send(usuarioEdited);

    }
}