const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { user_name, user_lastNames, user_birthday, user_email, user_password, user_country, user_gender } = req.body;
  const saltRounds = 10;

  bcrypt.hash(user_password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send(err);
    }

    db.query('INSERT INTO Users (user_name, user_lastNames, user_birthday, user_email, user_password, user_country, user_gender) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [user_name, user_lastNames, user_birthday, user_email, hashedPassword, user_country, user_gender], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('User created successfully');
    });
  });
};

exports.loginUser = (req, res) => {
  const { user_email, user_password } = req.body;

  db.query('SELECT * FROM Users WHERE user_email = ?', [user_email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = results[0];

    bcrypt.compare(user_password, user.user_password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!isMatch) {
        return res.status(401).send('Invalid email or password');
      }

      res.send('Login successful');
    });
  });
};

exports.testConnection = (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      return res.status(500).send('Database connection failed');
    }
    res.send('Database connection successful');
  });
};
