const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const roleRouter = require('./routes/roleRoute');
const app = express();
require('dotenv').config();

// 1) MIDDLEWARES
app.use(express.json());

app.use(cors(['*']))

// 2) ROUTES
app.use('/api/v1/roles',roleRouter);

const DB_CONN = process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PRODUCTION.replace("<PWD>",process.env.DATABASE_PASSWORD)
    : process.env.DATABASE;
// const DB_CONN = process.env.DATABASE;

mongoose.connect(DB_CONN).then((conn) => {
  console.log("Successfully connected to Tradeswap database");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});