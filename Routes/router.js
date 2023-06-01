const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../DataBase/db.js');
const userMiddleware = require('../Middleware/users.js');

/**
 * Ruta para el registro de usuarios.
 * Se valida el registro del usuario utilizando el middleware validateRegister de userMiddleware.
 * Si el nombre de usuario ya está en uso, se devuelve un código de estado 409 (Conflict).
 * Si el registro es exitoso, se guarda el hash de la contraseña en la base de datos y se devuelve un código de estado 201 (Created).
 */
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM login WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: err
        });
      }

      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            const userId = uuid.v4();
            const username = req.body.username;

            db.query(
              `INSERT INTO login (id, username, password, registered) VALUES (${db.escape(
                userId
              )}, ${db.escape(username)}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  return res.status(500).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

/**
 * Ruta para el inicio de sesión.
 * Se verifica si el usuario existe en la base de datos y si la contraseña es correcta.
 * Si la verificación es exitosa, se genera un token JWT, se actualiza el último inicio de sesión en la base de datos
 * y se devuelve el token junto con la información del usuario en un código de estado 200 (OK).
 */
router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }

      bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
        if (bErr) {
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }

        if (bResult) {
          const token = jwt.sign(
            {
              username: result[0].username,
              userId: result[0].id
            },
            'SECRETKEY',
            {
              expiresIn: '7d'
            }
          );

          db.query(`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`);
          return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]
          });
        }

        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      });
    }
  );
});

/**
 * Ruta para acceder a contenido secreto.
 * Se verifica si el usuario ha iniciado sesión utilizando el middleware isLoggedIn de userMiddleware.
 * Si el usuario ha iniciado sesión, se muestra el contenido secreto.
 */
router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;
