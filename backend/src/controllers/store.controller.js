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

// ==========================
// GET MY STORE
// ==========================
exports.getMyStore = (req, res) => {

  const userId =
    req.user.id;

  const query = `
    SELECT *
    FROM stores
    WHERE user_id = ?
    LIMIT 1
  `;

  db.query(
    query,
    [userId],
    (err, results) => {

      if (err) {

        return res.status(500).json({
          message:
            "Error fetching store"
        });

      }

      if (
        results.length === 0
      ) {

        return res.status(404).json({
          message:
            "Store not found"
        });

      }

      res.json(results[0]);

    }
  );

};


// ==========================
// UPDATE STORE
// ==========================
exports.updateStore = (req, res) => {

  const userId = req.user.id;

  const {
    name,
    description
  } = req.body;

  const logo =
    req.file
      ? req.file.filename
      : null;

  let query = `
    UPDATE stores
    SET
      name = ?,
      description = ?
  `;

  const values = [
    name,
    description
  ];

  if (logo) {

    query += `,
      logo = ?
    `;

    values.push(logo);

  }

  query += `
    WHERE user_id = ?
  `;

  values.push(userId);

  db.query(
    query,
    values,
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Error updating store"
        });
      }

      res.json({
        message: "Store updated"
      });

    }
  );

};