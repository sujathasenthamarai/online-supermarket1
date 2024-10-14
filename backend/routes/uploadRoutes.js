import path from 'path'
import express from 'express'
import multer from 'multer'
import { error } from 'console'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, image, cb) {
      cb(null, './public')
  },
  filename(req, image, cb) {
    cb(
      null,
      image.fieldname +'_' + Date.now()+ path.extname(image.originalname)
    )
    
  },
})


function checkFileType(image, cb) {
  
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(image.originalname).toLowerCase())
  const mimetype = filetypes.test(image.mimetype)
  
  if (extname && mimetype) {
     return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, image, cb) {
    checkFileType(image, cb)
  },

})


// const storage=multer.diskStorage({
//   destination: (req, image, cb)=>{
//       cb(null, `../public/uploads`)
// },
// filename:(req,image,cb)=>{
//    cb(null, image.fieldname + "_" + Date.now() + path.extname(image.originalname))
// }
// })
// const upload=multer({
// storage:storage
// })


router.post('/', upload.single('image'), (req, res) => {
  console.log(req.body)
   res.send(req.file.pathname)
},(error,req,res,next)=>{
  res.status('Error occurs').send({error:error.message})
})

export default router
