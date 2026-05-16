const db =
  require("../config/db");

module.exports =
  (req, res, next) => {

    const userId =
      req.user.id;

    const query = `
      SELECT *
      FROM stores
      WHERE user_id = ?
    `;

    db.query(
      query,
      [userId],
      (err, results) => {

        if (err) {

          return res.status(500).json({
            message:
              "Server error"
          });

        }

        // no store
        if (
          results.length === 0
        ) {

          return res.status(403).json({
            message:
              "You do not have a store"
          });

        }

        const store =
          results[0];

        // not approved
        if (
          store.status !==
          "approved"
        ) {

          return res.status(403).json({
            message:
              "Store not verified yet"
          });

        }

        // attach store
        req.store = store;

        next();

      }
    );

  };