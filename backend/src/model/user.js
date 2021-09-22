const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    cpf: {
        type: String,
        index: true,
        unique: true
      },
    nascimento: Date,
    rg: String,
    aplicativos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aplicativo',
    }],
    perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perfil',
    }
    
})

const User = mongoose.model('User', DataSchema )
module.exports = User;