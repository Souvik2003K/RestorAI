const express = require('express');
const UserController = require('../controllers/UserController');
const multer = require("multer")
const router = express.Router();
const Replicate = require("replicate");
const fs = require("fs/promises")
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const path = require('path');
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.post('/generate',  upload.single('file'), async (req, res) => {

    const file = req.file

    console.log(req.file)

    const fileBuffer = await fs.readFile(file.path);

    const input = {
        jpeg: 40,
        image: fileBuffer || "https://replicate.delivery/mgxm/247abcb1-a333-4a4a-8abf-5f51363e95e0/0014.jpg",
        noise: 15,
        task_type: "Real-World Image Super-Resolution-Large"
    };
    const output = await replicate.run("jingyunliang/swinir:660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a", { input });
    console.log('output',output)

    return res.json({
        file,
        output
    })
});

module.exports = router;