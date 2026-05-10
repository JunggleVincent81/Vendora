const db = require("../config/db");

exports.createProduct = (req, res) => {
  const userId = req.user.id;

  const {
    name,
    price,
    stock,
    category_id,
    description
  } = req.body;

  // IMAGE
  const image = req.file
    ? req.file.filename
    : null;

  // GET SELLER STORE
  const getStoreQuery = `
    SELECT * FROM stores
    WHERE user_id = ?
  `;

  db.query(getStoreQuery, [userId], (err, storeResult) => {

    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (storeResult.length === 0) {
      return res.status(400).json({
        message: "Seller has no store"
      });
    }

    const storeId = storeResult[0].id;

    // INSERT PRODUCT
    const insertQuery = `
      INSERT INTO products
      (
        store_id,
        category_id,
        name,
        description,
        price,
        stock,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        storeId,
        category_id,
        name,
        description,
        price,
        stock,
        image
      ],
      (err, result) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error creating product"
          });
        }

        res.status(201).json({
          message: "Product created successfully",
          productId: result.insertId
        });

      }
    );

  });
};

exports.getAllProducts = (req, res) => {

  const query = `
    SELECT
      p.*,
      s.name AS store_name,
      c.name AS category_name
    FROM products p
    JOIN stores s
      ON p.store_id = s.id
    JOIN categories c
      ON p.category_id = c.id
    ORDER BY p.id DESC
  `;

  db.query(query, (err, results) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Error fetching products"
      });
    }

    res.json(results);

  });
};

exports.updateProduct = (req, res) => {

  const userId = req.user.id;

  const productId = req.params.id;

  const {
    name,
    price,
    stock,
    description,
    category_id
  } = req.body;

  const image = req.file
    ? req.file.filename
    : null;

  // CHECK OWNERSHIP
  const checkQuery = `
    SELECT p.*
    FROM products p
    JOIN stores s
      ON p.store_id = s.id
    WHERE p.id = ?
    AND s.user_id = ?
  `;

  db.query(checkQuery, [productId, userId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.length === 0) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    // UPDATE QUERY
    let query = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        category_id = ?
    `;

    const values = [
      name,
      description,
      price,
      stock,
      category_id
    ];

    // IF IMAGE EXISTS
    if (image) {
      query += `, image = ?`;
      values.push(image);
    }

    query += ` WHERE id = ?`;

    values.push(productId);

    db.query(query, values, (err, updateResult) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Error updating product"
        });
      }

      res.json({
        message: "Product updated successfully"
      });

    });

  });

};

exports.deleteProduct = (req, res) => {

  const userId = req.user.id;

  const productId = req.params.id;

  const query = `
    DELETE p
    FROM products p
    JOIN stores s
      ON p.store_id = s.id
    WHERE p.id = ?
    AND s.user_id = ?
  `;

  db.query(query, [productId, userId], (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Error deleting product"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  });

};