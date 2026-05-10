const db = require("../config/db");
exports.createProduct = (req, res) => {
    const userId = req.user.id;
    const { name, price, stock, category_id, description } = req.body;
 
    const getStoreQuery = `SELECT * FROM stores WHERE user_id = ?`;
  
    db.query(getStoreQuery, [userId], (err, storeResult) => {
      if (storeResult.length === 0) {
        return res.status(400).json({ message: "Seller has no store" });
      }
  
      const storeId = storeResult[0].id;
  
      const insertQuery = `
        INSERT INTO products (store_id, category_id, name, description, price, stock)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      db.query(
        insertQuery,
        [storeId, category_id, name, description, price, stock],
        (err) => {
          if (err) return res.status(500).json({ message: "Error creating product" });
  
          res.json({ message: "Product created" });
        }
      );
    });
  };

  exports.getAllProducts = (req, res) => {
    const query = `
      SELECT p.*, s.name AS store_name, c.name AS category_name
      FROM products p
      JOIN stores s ON p.store_id = s.id
      JOIN categories c ON p.category_id = c.id
    `;
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: "Error" });
  
      res.json(results);
    });
  };

  exports.updateProduct = (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const { name, price, stock } = req.body;
  
    const query = `
      UPDATE products p
      JOIN stores s ON p.store_id = s.id
      SET p.name = ?, p.price = ?, p.stock = ?
      WHERE p.id = ? AND s.user_id = ?
    `;
  
    db.query(query, [name, price, stock, productId, userId], (err, result) => {
      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Not allowed" });
      }
  
      res.json({ message: "Product updated" });
    });
  };

  exports.deleteProduct = (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
  
    const query = `
      DELETE p FROM products p
      JOIN stores s ON p.store_id = s.id
      WHERE p.id = ? AND s.user_id = ?
    `;
  
    db.query(query, [productId, userId], (err, result) => {
      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Not allowed" });
      }
  
      res.json({ message: "Product deleted" });
    });
  };