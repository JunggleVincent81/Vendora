const db = require("../config/db");

// ==========================
// CREATE ORDER (FIXED)
// ==========================
exports.createOrder = (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const productIds = items.map(i => i.product_id);

  const getProductsQuery = `SELECT * FROM products WHERE id IN (?)`;

  db.query(getProductsQuery, [productIds], (err, products) => {
    if (err) {
      return res.status(500).json({ message: "DB error fetching products" });
    }

    let total = 0;

    // VALIDATION
    for (let item of items) {
      const product = products.find(p => p.id === item.product_id);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      total += product.price * item.quantity;
    }

    // ==========================
    // INSERT ORDER
    // ==========================
    const insertOrder = `
      INSERT INTO orders (user_id, total_price, status)
      VALUES (?, ?, 'pending')
    `;

    db.query(insertOrder, [userId, total], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating order" });
      }

      const orderId = result.insertId;

      // ==========================
      // ORDER ITEMS
      // ==========================
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

      const insertItems = `
        INSERT INTO order_items
        (order_id, product_id, store_id, quantity, price)
        VALUES ?
      `;

      db.query(insertItems, [orderItems], (err) => {
        if (err) {
          return res.status(500).json({ message: "Error inserting order items" });
        }

        // ==========================
        // UPDATE STOCK (SAFE LOOP)
        // ==========================
        let updateCount = 0;

        items.forEach(item => {
          db.query(
            `UPDATE products SET stock = stock - ? WHERE id = ?`,
            [item.quantity, item.product_id],
            () => {
              updateCount++;

              if (updateCount === items.length) {
                res.json({
                  message: "Order created successfully",
                  order_id: orderId,
                  total
                });
              }
            }
          );
        });
      });
    });
  });
};

// ==========================
// CUSTOMER ORDERS
// ==========================
exports.getMyOrders = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching orders" });
    }

    res.json(results);
  });
};

// ==========================
// SELLER ORDERS (FIXED LOGIC)
// ==========================
exports.getSellerOrders = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      o.id,
      o.total_price,
      o.status,
      o.created_at,
      u.name AS customer_name
    FROM orders o
    JOIN stores s ON o.store_id = s.id
    JOIN users u ON o.user_id = u.id
    WHERE s.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching seller orders" });
    }

    res.json(results);
  });
};

exports.getOrderDetail = (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT oi.*, p.name AS product_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `;

  db.query(query, [orderId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching order detail" });
    }

    res.json(results);
  });
};

// ==========================
// UPDATE STATUS (SECURE)
// ==========================
exports.updateOrderStatus = (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  const allowedStatus = [
    "pending",
    "paid",
    "packed",
    "shipped",
    "completed",
    "cancelled"
  ];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const query = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(query, [status, orderId], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error updating status" });
    }

    res.json({ message: "Status updated" });
  });
};