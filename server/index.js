const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const multer = require('multer');


const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mongosocio.vtpscar.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=MongoSocio`;


mongoose.connect(uri).then(() => {
    console.log('MongoDB Connected');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch(err => console.log(err));


// routes
app.use('/user',UserRoutes);