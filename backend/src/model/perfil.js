const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: String     
    
})

const Perfil = mongoose.model('Perfil', DataSchema )
module.exports = Perfil;