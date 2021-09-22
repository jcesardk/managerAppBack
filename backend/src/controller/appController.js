const { Mongoose } = require('mongoose');
const Aplicativo = require('../model/applicativo');

module.exports = {

    //Metodo lista todos aplicativos
    async listaApps(req, res) {
        const appsListados = await Aplicativo.find()
        res.json(appsListados);
    },
    
    //Metodo cria aplicativos
    async criaApp (req, res) {
        const {nome, bundleId} = req.body;
        const dataCreate = {
            nome, bundleId
        };

        try {
            if(await Aplicativo.findOne({ bundleId }))
            return res.status(400).send({ error: 'Aplicativo já existe'});
            
            const app = await Aplicativo.create(dataCreate);

            return res.send({ app });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Falha no registro!'})
        }

    },

    //Atualiza app
    async updateApp(req, res) {
        const { nome, bundleId } = req.body;
        let dataCreate = {}

        dataCreate = {
            nome, bundleId
        }
        const appUpdate = await Aplicativo.findByIdAndUpdate({bundleId}, dataCreate, {new: true})
        res.json(appUpdate);

    },

    //Lista app por ID
    async listaId(req, res) {
        const {_id} = req.params;
        const aplicativo = await Aplicativo.findOne({_id});
        res.json(aplicativo);
        
    },

    //Exclui app
    async excluir(req, res){
        const {_id} = req.params
        const aplicativo = await Aplicativo.findByIdAndDelete({_id})
        res.json(aplicativo);
    },
}
