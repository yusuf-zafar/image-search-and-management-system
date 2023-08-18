const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
// const verifyToken = require('./middlewares/verifyToken')

let dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use('/uploads', express.static('uploads'));


// Route imports
const imageRoute = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes')

app.use('/api',imageRoute);
app.use('/api', userRoutes);



module.exports = app;