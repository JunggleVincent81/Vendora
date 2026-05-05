const db = require("../config/db");

exports.createStore = (req, res) => {
  const userId = req.user.id;
  const { name, description } = req.body;

  const query = `
    INSERT INTO stores (user_id, name, description)
    VALUES (?, ?, ?)
  `;

  db.query(query, [userId, name, description], (err) => {
    if (err) return res.status(500).json({ message: "Error creating store" });

    res.json({ message: "Store created" });
  });
};

exports.getMyStore = (req, res) => {
    const userId = req.user.id;
  
    const query = `SELECT * FROM stores WHERE user_id = ?`;
  
    db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ message: "Error" });
  
      res.json(results[0]);
    });
  };