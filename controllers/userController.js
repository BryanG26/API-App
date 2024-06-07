// controllers/userController.js
import db from '../config/db.js';

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

export const getUserTimesByName = (req, res) => {
  const atletaName = req.params.atletaName;

  const query = 'CALL GetUserTimesByName(?)';

  db.query(query, [atletaName], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno del servidor', error: err });
    }

    if (results[0].length === 0) {
      return res.status(404).send({ message: 'Tiempos no encontrados' });
    }

    res.json(results[0]);
  });
};

export const getUserTimesByEventAndUser = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const eventName = req.params.eventName;

  const query = 'CALL GetUserTimesByEventAndUser(?, ?)';

  db.query(query, [userId, eventName], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno del servidor', error: err });
    }

    if (results[0].length === 0) {
      return res.status(404).send({ message: 'No se encontraron tiempos para el usuario y evento especificados' });
    }

    res.json(results[0]);
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
