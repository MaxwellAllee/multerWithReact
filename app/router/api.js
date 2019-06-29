const router = require("express").Router();
const Grid = require('gridfs-stream');
const multer = require('multer');
const storage = require('../controllers/controller')
const upload = multer({ storage });
const connectionInfo = require('../../server')
let gfs;
const conn = connectionInfo.conn
const mongoose = require('mongoose');
const path = require("path");
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  exports.gfs = gfs
});
const image = ('./me.jpg')

router.route('/getFiles')
  .get((req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('index', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
            file.isVideo = false;
          }
          else if (file.contentType === 'video/mp4') {
            file.isImage = false;
            file.isVideo = true;
          } else {
            file.isImage = false;
            file.isVideo = true;
          }
        });
        console.log(files)
        // res.render('index', {files: files});
        res.send(files);
      }
    });
  });

router.route('/upload')
  .post(upload.single('file'), (req, res) => {
    // res.json({ file: req.file });router.route('/arePhotos')
  })
  .get((req, res) => {
    gfs.files.find().toArray((err, files) => {
      console.log(files)
    })

    res.redirect('/');
  });

// @route GET /files
// @desc  Display all files in JSON
router.route('/files')
  .get((req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }

      // Files exist
      return res.json(files);
    });
  });

// @route GET /files/:filename
// @desc  Display single file object
router.route('/files/:filename')
  .get((req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });

// @route GETconst mongoose = require('mongoose'); /image/:filename
// @desc Display Image
router.route('/image/:filename')
  .get((req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });
router.route('/video/:filename')
  .get((req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // Check if image
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });
router.route('/files/delete/:id')
  .post((req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.redirect('/');
    });
  });
module.exports = router
