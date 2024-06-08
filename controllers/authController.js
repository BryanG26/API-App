import db from '../config/db.js';

export const loginUser = (req, res) => {
    const { user_email, user_password } = req.body;
  
    const query = 'CALL LoginUser(?, ?, @out_login_success)';
    const selectQuery = 'SELECT @out_login_success AS login_success';
  
    db.query(query, [user_email, user_password], (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Error interno del servidor', error: err });
      }
  
      db.query(selectQuery, (err, selectResults) => {
        if (err) {
          return res.status(500).send({ message: 'Error interno del servidor', error: err });
        }
  
        const loginSuccess = selectResults[0].login_success;
  
        if (loginSuccess) {
          return res.status(200).send({ message: 'Inicio de sesión exitoso' });
        } else {
          return res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
      });
    });
  };