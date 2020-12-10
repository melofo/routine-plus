const router = require('express').Router();
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const { mongo, connection } = require('mongoose');
const Grid = require('gridfs-stream');

// console.log(mongoose.connection);
// console.log(mongoose.connection.db);
// var gfs = Grid(mongoose.connection, mongoose.mongo);
// gfs.collection("uploads");

// Create storage engine
let gfs;
const uri = "mongodb+srv://Junfeng:Junfeng@cluster0.5awtz.mongodb.net/<dbname>?retryWrites=true&w=majority";
connection.once("open", () => {
  gfs = Grid(connection.db, mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({storage});
router.route('/').post(upload.single("img"), (req, res)=>{
    res.send(req.files);
  }
);

router.route("/:filename").get((req, res)=>{  
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser 
      const readstream = gfs.createReadStream({
        filename: file.filename
      })
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});


module.exports = router;