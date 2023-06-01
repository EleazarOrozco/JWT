const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Middleware para validar el registro de usuarios.
   * Verifica que el nombre de usuario tenga al menos 3 caracteres,
   * la contraseña tenga al menos 6 caracteres
   * y que las contraseñas coincidan en el campo de repetición de contraseña.
   */
  validateRegister: (req, res, next) => {
    console.log(req.body);
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    if (
      !req.body.password_repeat ||
      req.body.password !== req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }

    next();
  },

  /**
   * Middleware para verificar si el usuario ha iniciado sesión.
   * Verifica el token de autenticación presente en la cabecera de la solicitud.
   * Si el token es válido, decodifica la información del usuario y la agrega a la solicitud (req.userData).
   * Si el token no es válido, devuelve un mensaje de error 401.
   */
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'SECRETKEY');
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }
};
