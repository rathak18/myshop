const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const chefRoutes = require('./routes/chef.js');
// const userRoutes = require('./routes/user.js');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { globalLimiter, specificLimiter } = require('./utils/rateLimiter.js');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 6000;
app.use(bodyParser.json());
app.use(helmet());
app.use(globalLimiter);
app.use(cors());
app.use(morgan('combined'));


//    app.use('/api', chefRoutes);
//    app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`server ${process.pid} is running on port ${PORT}`);
});
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};


connectToDB()