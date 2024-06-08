import db from '../config/db.js';

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

export const insertTime = (req, res) => {
    const { user_performance, event_description, user_performance_date, user_performer, user_event } = req.body;
  
    const query = 'CALL InsertTime(?, ?, ?, ?, ?)';
  
    db.query(query, [user_performance, event_description, user_performance_date, user_performer, user_event], (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Error interno del servidor', error: err });
      }
  
      res.status(201).send({ message: 'Tiempo insertado correctamente', results });
    });
  };