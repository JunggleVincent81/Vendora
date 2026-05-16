const db = require("../config/db");
const bcrypt = require("bcryptjs");


// ==========================
// GET MY PROFILE
// ==========================
exports.getMyProfile = (req, res) => {

  const userId = req.user.id;

  const query = `
    SELECT
      id,
      name,
      email,
      role,
      avatar
    FROM users
    WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Error fetching profile"
      });
    }

    res.json(results[0]);

  });

};


// ==========================
// UPDATE PROFILE
// ==========================
exports.updateProfile = (req, res) => {

  const userId = req.user.id;

  const {
    name,
    email
  } = req.body;

  const avatar =
    req.file
      ? req.file.filename
      : null;

  let query = `
    UPDATE users
    SET
      name = ?,
      email = ?
  `;

  const values = [
    name,
    email
  ];

  // optional avatar
  if (avatar) {

    query += `,
      avatar = ?
    `;

    values.push(avatar);

  }

  query += `
    WHERE id = ?
  `;

  values.push(userId);

  db.query(
    query,
    values,
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Error updating profile"
        });
      }

      res.json({
        message: "Profile updated"
      });

    }
  );

};


// ==========================
// UPDATE PASSWORD
// ==========================
exports.updatePassword = (req, res) => {

  const userId = req.user.id;

  const {
    currentPassword,
    newPassword
  } = req.body;

  const getUserQuery =
    `SELECT * FROM users WHERE id = ?`;

  db.query(
    getUserQuery,
    [userId],
    (err, results) => {

      if (
        err ||
        results.length === 0
      ) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const user = results[0];

      const isMatch =
        bcrypt.compareSync(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message: "Current password incorrect"
        });
      }

      const hashed =
        bcrypt.hashSync(
          newPassword,
          10
        );

      db.query(
        `
        UPDATE users
        SET password = ?
        WHERE id = ?
        `,
        [hashed, userId],
        (err) => {

          if (err) {
            return res.status(500).json({
              message: "Error updating password"
            });
          }

          res.json({
            message: "Password updated"
          });

        }
      );

    }
  );

};