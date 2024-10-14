
import morgan from 'morgan';
import express from 'express';
import multer from 'multer';
const app = express();
const upload = multer({dest: 'uploads/'});
const router = express.Router()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// app.use(express.static(__dirname, 'public'));


const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/public/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});






router.post('/', upload.single('file'), (req, res) => {
    const host = req.host;
    const filePath = req.protocol + "://" + host + '/' + req.file.path;
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  });

  export default router