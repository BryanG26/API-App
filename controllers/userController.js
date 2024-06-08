// controllers/userController.js
import db from '../config/db.js';

//Gets
export const getAllUsers = (req, res) => {
  db.query('SELECT * FROM vw_UserInfo', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const getUserById = (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  db.query('CALL GetUserById(?)', [userId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno del servidor', error: err });
    }
    
    if (results[0].length === 0) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.json(results[0][0]);
  });
};

export const getUsersByUserName = (req, res) => {
  const userName = req.params.userName;

  const query = 'CALL GetUsersByUserName(?)';

  db.query(query, [userName], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno del servidor', error: err });
    }

    if (results[0].length === 0) {
      return res.status(404).send({ message: 'No se encontró el Usuario especificado' });
    }

    res.json(results[0]);
  });
};

//Creates
export const insertUser = (req, res) => {
  const { user_name, user_lastNames, user_birthday, user_email, user_password, user_country, user_gender } = req.body;

  const query = 'CALL InsertUser(?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [user_name, user_lastNames, user_birthday, user_email, user_password, user_country, user_gender], (err, results) => {
    if (err) {
      if (err.sqlState === '45000') {
        return res.status(400).send({ message: err.sqlMessage });
      }
      return res.status(500).send({ message: 'Error interno del servidor', error: err });
    }

    res.status(201).send({ message: 'Usuario insertado correctamente', results });
  });
};