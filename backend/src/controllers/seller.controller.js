const db = require("../config/db");

exports.getSellerAnalytics = (req, res) => {

  const userId = req.user.id;

  // 1. get store
  const storeQuery = `SELECT id FROM stores WHERE user_id = ?`;

  db.query(storeQuery, [userId], (err, storeResult) => {

    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    if (storeResult.length === 0) {
      return res.status(400).json({ message: "No store found" });
    }

    const storeId = storeResult[0].id;

    // 2. analytics queries (paralel style sederhana)

    const productQuery = `
      SELECT COUNT(*) AS totalProducts
      FROM products
      WHERE store_id = ?
    `;

    const revenueQuery = `
      SELECT COALESCE(SUM(oi.qty * oi.price), 0) AS revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE p.store_id = ?
    `;

    const topProductQuery = `
      SELECT p.name, SUM(oi.qty) AS totalSold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE p.store_id = ?
      GROUP BY oi.product_id
      ORDER BY totalSold DESC
      LIMIT 1
    `;

    db.query(productQuery, [storeId], (err, productRes) => {

      if (err) return res.status(500).json({ message: "Error products" });

      db.query(revenueQuery, [storeId], (err, revenueRes) => {

        if (err) return res.status(500).json({ message: "Error revenue" });

        db.query(topProductQuery, [storeId], (err, topRes) => {

          if (err) return res.status(500).json({ message: "Error top product" });

          res.json({
            totalProducts: productRes[0].totalProducts,
            revenue: revenueRes[0].revenue || 0,
            topProduct: topRes.length ? topRes[0].name : "No sales yet"
          });

        });

      });

    });

  });

};