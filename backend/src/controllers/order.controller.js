const db = require("../config/db");

exports.createOrder = (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = 0;

  // Step 1: ambil semua produk
  const productIds = items.map(i => i.product_id);

  const query = `SELECT * FROM products WHERE id IN (?)`;

  db.query(query, [productIds], (err, products) => {
    if (err) return res.status(500).json({ message: "Error" });

    // Step 2: validasi & hitung
    for (let item of items) {
      const product = products.find(p => p.id === item.product_id);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Stock not enough" });
      }

      total += product.price * item.quantity;
    }

    // Step 3: insert order
    const orderQuery = `
      INSERT INTO orders (user_id, total_price)
      VALUES (?, ?)
    `;

    db.query(orderQuery, [userId, total], (err, result) => {
      const orderId = result.insertId;

      // Step 4: insert order items
      const orderItems = items.map(item => {
        const product = products.find(p => p.id === item.product_id);

        return [
          orderId,
          product.id,
          product.store_id,
          item.quantity,
          product.price
        ];
      });

      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, store_id, quantity, price)
        VALUES ?
      `;

      db.query(itemQuery, [orderItems], (err) => {
        // Step 5: update stok
        items.forEach(item => {
          const product = products.find(p => p.id === item.product_id);

          db.query(
            `UPDATE products SET stock = stock - ? WHERE id = ?`,
            [item.quantity, product.id]
          );
        });

        res.json({ message: "Order created" });
      });
    });
  });
};

exports.getMyOrders = (req, res) => {
    const userId = req.user.id;
  
    const query = `
      SELECT * FROM orders WHERE user_id = ?
    `;
  
    db.query(query, [userId], (err, results) => {
      res.json(results);
    });
  };

  exports.getSellerOrders = (req, res) => {
    const userId = req.user.id;
  
    const query = `
      SELECT oi.*, o.status, p.name as product_name
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      JOIN stores s ON oi.store_id = s.id
      WHERE s.user_id = ?
    `;
  
    db.query(query, [userId], (err, results) => {
      res.json(results);
    });
  };

  exports.updateOrderStatus = (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;
  
    const query = `
      UPDATE orders SET status = ?
      WHERE id = ?
    `;
  
    db.query(query, [status, orderId], (err) => {
      res.json({ message: "Status updated" });
    });
  };