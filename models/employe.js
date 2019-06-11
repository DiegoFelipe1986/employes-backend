var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var employeSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es necesario'] },
    lastname: { type: String, unique: true, required: [true, 'El apellido es necesario'] },
    pay: { type: String, required: [true, 'El salario es necesario'] },
    birthday: { type: String, required: [true, 'El cumpleaños es necesario'] },
});


module.exports = mongoose.model('Employe', employeSchema);