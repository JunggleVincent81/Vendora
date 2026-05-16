const multer = require("multer");
const path = require("path");


// ==========================
// STORAGE
// ==========================
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    const unique =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      unique +
      path.extname(file.originalname)
    );

  }

});


// ==========================
// FILE FILTER
// ==========================
const fileFilter = (
  req,
  file,
  cb
) => {

  const allowed =
    [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp"
    ];

  if (
    allowed.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error("Invalid file type"),
      false
    );

  }

};


// ==========================
// EXPORT
// ==========================
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024
  }

});

module.exports = upload;