var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel.js');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(
      usuario,
      password
    );

    if (data != undefined) {
      console.log(data);
      req.session.usuario = data.usuario;
      req.session.nombre = data.usuario;
      console.log('sessionuserid', req.session.usuario);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

module.exports = router;
