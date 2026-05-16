const db = require("../config/db");


// ==========================
// HELPERS
// ==========================
const sendError = (
  res,
  message = "Server Error"
) => {

  return res.status(500).json({
    message
  });

};

const isValidStatus = (
  value,
  allowed
) => {

  return allowed.includes(value);

};


// ==========================
// GET ALL STORES
// ==========================
exports.getAllStores = (
  req,
  res
) => {

  const query = `
    SELECT
      stores.*,

      users.name
        AS owner_name,

      users.email

    FROM stores

    JOIN users
      ON stores.user_id = users.id

    ORDER BY stores.created_at DESC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching stores"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// GET ALL USERS
// ==========================
exports.getAllUsers = (
  req,
  res
) => {

  const query = `
    SELECT
      id,
      name,
      email,
      role,
      status,
      created_at

    FROM users

    ORDER BY created_at DESC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching users"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// UPDATE USER STATUS
// ==========================
exports.updateUserStatus = (
  req,
  res
) => {

  const userId =
    req.params.id;

  const { status } =
    req.body;

  const allowedStatuses = [
    "active",
    "suspended",
    "banned"
  ];

  if (
    !isValidStatus(
      status,
      allowedStatuses
    )
  ) {

    return res.status(400).json({
      message: "Invalid status"
    });

  }

  const query = `
    UPDATE users
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [status, userId],
    (err) => {

      if (err) {
        return sendError(
          res,
          "Error updating user"
        );
      }

      res.json({
        message:
          "User updated"
      });

    }
  );

};


// ==========================
// UPDATE STORE STATUS
// ==========================
exports.updateStoreStatus = (
  req,
  res
) => {

  const storeId =
    req.params.id;

  const { status } =
    req.body;

  const allowedStatuses = [
    "approved",
    "rejected",
    "pending"
  ];

  if (
    !isValidStatus(
      status,
      allowedStatuses
    )
  ) {

    return res.status(400).json({
      message: "Invalid status"
    });

  }

  const query = `
    UPDATE stores
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [status, storeId],
    (err) => {

      if (err) {
        return sendError(
          res,
          "Error updating store"
        );
      }

      res.json({
        message:
          "Store status updated"
      });

    }
  );

};


// ==========================
// GET ALL PRODUCTS
// ==========================
exports.getAllProducts = (
  req,
  res
) => {

  const query = `
    SELECT
      products.*,

      stores.name
        AS store_name

    FROM products

    JOIN stores
      ON products.store_id = stores.id

    ORDER BY products.created_at DESC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching products"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// UPDATE PRODUCT STATUS
// ==========================
exports.updateProductStatus = (
  req,
  res
) => {

  const productId =
    req.params.id;

  const { status } =
    req.body;

  const allowedStatuses = [
    "approved",
    "hidden",
    "rejected",
    "pending"
  ];

  if (
    !isValidStatus(
      status,
      allowedStatuses
    )
  ) {

    return res.status(400).json({
      message: "Invalid status"
    });

  }

  const query = `
    UPDATE products
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [status, productId],
    (err) => {

      if (err) {
        return sendError(
          res,
          "Error updating product"
        );
      }

      res.json({
        message:
          "Product updated"
      });

    }
  );

};


// ==========================
// GET ALL ORDERS
// ==========================
exports.getAllOrders = (
  req,
  res
) => {

  const query = `
    SELECT
      o.id,
      o.total_price,
      o.status,
      o.created_at,

      u.name
        AS customer_name,

      u.email
        AS customer_email

    FROM orders o

    JOIN users u
      ON o.user_id = u.id

    ORDER BY o.created_at DESC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching orders"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// GET ORDER DETAIL
// ==========================
exports.getAdminOrderDetail = (
  req,
  res
) => {

  const orderId =
    req.params.id;

  const query = `
    SELECT
      oi.*,

      p.name
        AS product_name,

      p.image,

      s.name
        AS store_name

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    JOIN stores s
      ON oi.store_id = s.id

    WHERE oi.order_id = ?
  `;

  db.query(
    query,
    [orderId],
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching order detail"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// DASHBOARD STATS
// ==========================
exports.getDashboardStats = (
  req,
  res
) => {

  const query = `
    SELECT

      (
        SELECT COUNT(*)
        FROM users
      ) AS users,

      (
        SELECT COUNT(*)
        FROM users
        WHERE role = 'seller'
      ) AS sellers,

      (
        SELECT COUNT(*)
        FROM stores
      ) AS stores,

      (
        SELECT COUNT(*)
        FROM stores
        WHERE status = 'pending'
      ) AS pendingStores,

      (
        SELECT COUNT(*)
        FROM products
      ) AS products,

      (
        SELECT COUNT(*)
        FROM orders
      ) AS orders,

      (
        SELECT COALESCE(
          SUM(total_price),
          0
        )
        FROM orders
        WHERE status = 'completed'
      ) AS revenue
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching dashboard stats"
        );
      }

      res.json(results[0]);

    }
  );

};


// ==========================
// ADMIN ANALYTICS
// ==========================
exports.getAnalytics = (
  req,
  res
) => {

  const query = `
    SELECT

      (
        SELECT COUNT(*)
        FROM users
      ) AS totalUsers,

      (
        SELECT COUNT(*)
        FROM stores
        WHERE status = 'approved'
      ) AS totalStores,

      (
        SELECT COUNT(*)
        FROM products
        WHERE status = 'approved'
      ) AS totalProducts,

      (
        SELECT COUNT(*)
        FROM orders
      ) AS totalOrders,

      (
        SELECT COALESCE(
          SUM(total_price),
          0
        )
        FROM orders
        WHERE status = 'completed'
      ) AS totalRevenue
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Analytics error"
        );
      }

      res.json(results[0]);

    }
  );

};


// ==========================
// REVENUE ANALYTICS
// ==========================
exports.getRevenueAnalytics = (
  req,
  res
) => {

  const query = `
    SELECT
      DATE(created_at)
        AS date,

      SUM(total_price)
        AS revenue,

      COUNT(*)
        AS orders

    FROM orders

    WHERE status = 'completed'

    GROUP BY DATE(created_at)

    ORDER BY date ASC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching revenue analytics"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// TOP PRODUCTS
// ==========================
exports.getTopProducts = (
  req,
  res
) => {

  const query = `
    SELECT
      p.id,
      p.name,

      SUM(oi.quantity)
        AS totalSold,

      SUM(
        oi.price * oi.quantity
      ) AS revenue

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    GROUP BY p.id

    ORDER BY totalSold DESC

    LIMIT 10
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching top products"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// TOP SELLERS
// ==========================
exports.getTopSellers = (
  req,
  res
) => {

  const query = `
    SELECT
      s.id,
      s.name,

      SUM(
        oi.price * oi.quantity
      ) AS revenue,

      COUNT(
        DISTINCT oi.order_id
      ) AS totalOrders

    FROM order_items oi

    JOIN stores s
      ON oi.store_id = s.id

    GROUP BY s.id

    ORDER BY revenue DESC

    LIMIT 10
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching top sellers"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// ORDER STATUS ANALYTICS
// ==========================
exports.getOrderStatusAnalytics = (
  req,
  res
) => {

  const query = `
    SELECT
      status,

      COUNT(*)
        AS total

    FROM orders

    GROUP BY status
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching status analytics"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// USER GROWTH
// ==========================
exports.getUserGrowth = (
  req,
  res
) => {

  const query = `
    SELECT
      DATE(created_at)
        AS date,

      COUNT(*)
        AS users

    FROM users

    GROUP BY DATE(created_at)

    ORDER BY date ASC
  `;

  db.query(
    query,
    (err, results) => {

      if (err) {
        return sendError(
          res,
          "Error fetching user growth"
        );
      }

      res.json(results);

    }
  );

};


// ==========================
// ADMIN DASHBOARD
// ==========================
exports.getDashboard = (
  req,
  res
) => {

  const dashboard = {};

  const statsQuery = `
    SELECT

      (
        SELECT COUNT(*)
        FROM users
      ) AS users,

      (
        SELECT COUNT(*)
        FROM stores
      ) AS stores,

      (
        SELECT COUNT(*)
        FROM products
      ) AS products,

      (
        SELECT COUNT(*)
        FROM orders
      ) AS orders,

      (
        SELECT COALESCE(
          SUM(total_price),
          0
        )
        FROM orders
        WHERE status = 'completed'
      ) AS revenue
  `;

  const pendingStoresQuery = `
    SELECT *
    FROM stores
    WHERE status = 'pending'
    ORDER BY created_at DESC
    LIMIT 5
  `;

  const pendingProductsQuery = `
    SELECT *
    FROM products
    WHERE status = 'pending'
    ORDER BY created_at DESC
    LIMIT 5
  `;

  const recentOrdersQuery = `
    SELECT
      orders.*,

      users.name
        AS customer_name

    FROM orders

    JOIN users
      ON orders.user_id = users.id

    ORDER BY orders.created_at DESC

    LIMIT 5
  `;

  const latestUsersQuery = `
    SELECT
      id,
      name,
      email,
      role,
      created_at

    FROM users

    ORDER BY created_at DESC

    LIMIT 5
  `;

  db.query(
    statsQuery,
    (err, statsResult) => {

      if (err) {
        return sendError(
          res,
          "Error fetching stats"
        );
      }

      dashboard.stats =
        statsResult[0];

      db.query(
        pendingStoresQuery,
        (
          err,
          storesResult
        ) => {

          if (err) {
            return sendError(
              res,
              "Error fetching stores"
            );
          }

          dashboard.pendingStores =
            storesResult;

          db.query(
            pendingProductsQuery,
            (
              err,
              productsResult
            ) => {

              if (err) {
                return sendError(
                  res,
                  "Error fetching products"
                );
              }

              dashboard.pendingProducts =
                productsResult;

              db.query(
                recentOrdersQuery,
                (
                  err,
                  ordersResult
                ) => {

                  if (err) {
                    return sendError(
                      res,
                      "Error fetching orders"
                    );
                  }

                  dashboard.recentOrders =
                    ordersResult;

                  db.query(
                    latestUsersQuery,
                    (
                      err,
                      usersResult
                    ) => {

                      if (err) {
                        return sendError(
                          res,
                          "Error fetching users"
                        );
                      }

                      dashboard.latestUsers =
                        usersResult;

                      res.json(
                        dashboard
                      );

                    }
                  );

                }
              );

            }
          );

        }
      );

    }
  );

};