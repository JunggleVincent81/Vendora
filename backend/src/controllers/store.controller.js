const db = require("../config/db");

exports.createStoreRequest = (req, res) => {

  const userId = req.user.id;

  const { name, description } = req.body;

  const query = `
    INSERT INTO stores (user_id, name, description, status)
    VALUES (?, ?, ?, 'pending')
  `;

  db.query(
    query,
    [userId, name, description],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to submit store request"
        });
      }

      res.json({
        message: "Store request submitted. Waiting for admin approval."
      });

    }
  );

};

exports.getMyStore = (req, res) => {

  const userId = req.user.id;

  const query = `
    SELECT * FROM stores
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Error"
      });
    }

    res.json(result[0] || null);

  });

};