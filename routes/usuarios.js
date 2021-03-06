let express = require('express'),
 debug = require('debug')('BC:ctrUser'),
 config = require( '../config/general' ),
 usuario = require( '../models/Usuario' ),
 mysql = require('mysql'),
 mdAutenticacion = require('../middlewares/autenticacion'),
 router = express.Router();

router.get('/', mdAutenticacion.verificatoken(usuario.PERMISO.LISTAR), (req, res, next) => {
  res.render("usuarios/lista", { title: 'Usuarios', usuario:req.session.usuario });
});

router.get('/listar',  mdAutenticacion.verificatoken(usuario.PERMISO.LISTAR), (req, res, next) => {
  let connection = mysql.createConnection(config.connection);
  connection.connect();
  let promesa = config.consultar(connection, 'SELECT * FROM usuario');
  promesa.then(value => {
    res.json(value);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/obtener-roles', mdAutenticacion.verificatoken(usuario.PERMISO.CREAR), (req, res, next) => {
  let connection = mysql.createConnection(config.connection);
  connection.connect();
  let promesa = config.consultar(connection, 'SELECT * FROM rol WHERE estado = "Activo" ');
  promesa.then(value => {
    res.json(value);
  })
  .catch(err => {
    debug(err);
    res.status(500).json(err);
  });
});

router.get('/formulario', mdAutenticacion.verificatoken(usuario.PERMISO.CREAR), (req, res, next) => {
  res.render('usuarios/formulario', { title: 'Usuarios - Formulario', usuario:req.session.usuario });
});

router.get('/formulario/:id', mdAutenticacion.verificatoken(usuario.PERMISO.EDITAR), (req, res, next) => {
  res.render('usuarios/formulario', { title: 'Usuarios - Formulario', id : req.params.id, usuario:req.session.usuario });
});

router.post('/',  mdAutenticacion.verificatoken(usuario.PERMISO.CREAR), (req, res, next) => {
  let connection = mysql.createConnection(config.connection),
    query = "INSERT INTO usuario (nombre, estado, usuarioRed, contrasena, correo, telefonoMovil, idUsuarioCreacion, cedula) VALUES (?,?,?,?,?,?,?,?)",
    data = [req.body.nombre, req.body.estado, req.body.usuarioRed, req.body.contrasena, req.body.correo, req.body.telefonoMovil, req.session.usuario.id, req.body.cedula];
  connection.connect();
  let promesa = config.consultar(connection, query, data);
  promesa
  .then(value => {
    let data = '';
    req.body.idRol.forEach((item, i) => {
      data = ` ${data} ( '${value.insertId}','${item}'),`
    });
    data = data.slice(0, data.length - 1);

    let connection2 = mysql.createConnection(config.connection);
    let query = `INSERT INTO usuario_rol ( idUsuario, idRol)
     values ${data}`;
    let promesa = config.consultar(connection2, query, data);
    return promesa
  })
  .then(value => {
    res.json({data: value});
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.post('/editar',  mdAutenticacion.verificatoken(usuario.PERMISO.EDITAR), (req, res, next) => {
  debug('**************-*************-************');
  let connection = mysql.createConnection(config.connection),
    query = `UPDATE usuario
     SET nombre = '${req.body.nombre}', estado = '${req.body.estado}', usuarioRed = '${req.body.usuarioRed}', correo = '${req.body.correo}', telefonoMovil = '${req.body.telefonoMovil}', cedula = '${req.body.cedula}'
     WHERE id = '${req.body.id}'`;
  connection.connect();
  let promesaUsuario = config.consultar(connection, query);
  let connection2 = mysql.createConnection(config.connection),
    query2 = `DELETE FROM usuario_rol  WHERE idUsuario = '${req.body.id}'`;
    // query2 = `UPDATE usuario_rol SET idRol = '${req.body.idRol}' WHERE idUsuario = '${req.body.id}'`;
  let promesaUsuarioRol = config.consultar(connection2, query2);
  Promise.all([promesaUsuario, promesaUsuarioRol])
  .then(value => {
    debug(11111111111111111111111);
    let data = '';
    req.body.idRol.forEach((item, i) => {
      data = ` ${data} ( '${req.body.id}','${item}'),`
    });
    data = data.slice(0, data.length - 1);
    let connection3 = mysql.createConnection(config.connection);
    let query = `INSERT INTO usuario_rol ( idUsuario, idRol)
     values ${data}`;
    let promesa = config.consultar(connection3, query, data);
    return promesa
    // res.json({data: value});
  })
  .then(value => {
    debug(222222222222222222222222);
    res.json({data: value});
  })
  .catch(err => {
    debug('??????????????');
    debug(err);
    res.status(500).json(err);
  });
});

router.get('/obtener/:id',  mdAutenticacion.verificatoken(usuario.PERMISO.EDITAR), (req, res, next) => {
  let query = 'SELECT * FROM usuario INNER JOIN usuario_rol ON usuario.id = usuario_rol.idUsuario WHERE usuario.id = ' + req.params.id,
    connection = mysql.createConnection(config.connection);
  connection.connect();
  let promesa = config.consultar(connection, query);
  promesa.then(value => {
    debug('value obtener');
    debug(value);
    let roles = [];
    value.forEach((item, i) => {
      roles.push(item.idRol);
    });
    debug(roles);
    value[0].idRol = roles;
    if (value && value.length) res.json(value);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/eliminar/:id', mdAutenticacion.verificatoken(usuario.PERMISO.ELIMINAR), (req, res, next) => {
  let query = "UPDATE usuario SET estado = 'Eliminado' WHERE usuario.id = " + req.params.id;
  let connection = mysql.createConnection(config.connection);
  connection.connect();
  let promesa = config.consultar(connection, query);
  promesa.then(value => {
    res.json(value);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});


module.exports = router;
