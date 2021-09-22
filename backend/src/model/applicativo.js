const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: String,
    bundleId: {
        type: String,
        index: true,
        unique: true
      }
})

const Aplicativo = mongoose.model('Aplicativo', DataSchema )
module.exports = Aplicativo;