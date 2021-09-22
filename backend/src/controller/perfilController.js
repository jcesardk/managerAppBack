const { Mongoose } = require('mongoose');
const Perfil = require('../model/perfil');

module.exports = {

    //Lista perfil de usuario
    async listaPerfil(req, res) {
        const perfilListados = await Perfil.find()
        res.json(perfilListados);
    },
    
    //Cria o tipo de perfil para usuario
    async criaPerfil (req, res) {
        const {nome} = req.body;
        const dataCreate = {
            nome
        };

        try {
            if(await Perfil.findOne({ nome }))
            return res.status(400).send({ error: 'Perfil já existe'});
            
            const perfil = await Perfil.create(dataCreate);

            return res.send({ perfil });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Falha no registro!'})
        }

    },

    //Atualiza perfil
    async updatePerfil(req, res) {
        const { nome, _id } = req.body;
        let dataAtualiza = {}

        dataAtualiza = {
            nome
        }
        const perfilUpdate = await Perfil.findByIdAndUpdate({_id}, dataAtualiza, {new: true})
        res.json(perfilUpdate);

    },

    //Lista perfil por ID
    async listaId(req, res) {
        const {_id} = req.params;
        const perfil = await Perfil.findOne({_id});
        res.json(perfil);
        
    },

    //Excluir perfil
    async excluir(req, res){
        const {_id} = req.params
        const perfil = await Perfil.findByIdAndDelete({_id})
        res.json(perfil);
    },
}


