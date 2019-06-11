var express = require('express');
var app = express();
var Employe = require('../models/employe');

// =============================
//  Get all employes
// =============================
app.get('/allemployees', (req, res) => {

    Employe.find({}, 'name lastname birthday pay')
    .exec(
        (err, employes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error cargando empleados',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            employes
        });

    });

});

// =============================
//  Get employe by id,
// =============================
app.get('/employee/:id', (req, res) => {
    var id = req.params.id;

    Employe.findById( id, (err, employe) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar al empleado',
                errors: err
            });
        }

        if (!employe) {
            return res.status(400).json({
                ok: false,
                message: `El empleado con el ${id} no existe `,
                errors: {message: `No exíste un empleado con el id ${id}`}
            });
        }

        res.status(200).json({
            ok: true,
            employe
        });

    });


});

// =============================
//  Update employee put
// =============================
app.put('/employee/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Employe.findById(id, (err, employe) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar empleado',
                errors: err
            });
        }

        if (!employe) {
            return res.status(400).json({
                ok: false,
                message: `El usuario con el id ${id} no existe` ,
                errors: {message: 'no existe usuario xon ese id'}
            });
        }

        employe.name = body.name;
        employe.lastname = body.lastname;
        employe.birthday = body.birthday;
        employe.pay = body.pay;

        employe.save((err, employeSaved) =>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar empleado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                employe: employeSaved
            });

        });
    });

});

// =============================
//  Create new employe Post
// =============================
app.post('/employee', (req, res) => {
    var body = req.body;

    var employe = new Employe({
        name: body.name,
        lastname: body.lastname,
        birthday: body.birthday,
        pay: body.pay
    });

    employe.save((err, employeSaved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear empleado',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            employe: employeSaved
        });

    });

});

// =============================
//  Delete new employe Post
// =============================
app.delete('/employee/:id', (req, res) => {
    var id = req.params.id;

    Employe.findByIdAndRemove(id, (err, employeDeleted) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al eliminar empleado',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            employe: employeDeleted
        });
    });
})

module.exports = app;