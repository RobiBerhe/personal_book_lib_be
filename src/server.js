require("dotenv").config();
require("./loader")
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/', require('./routes/router'));


app.listen(process.env.APP_PORT, () => {
    console.log(`server running on port ${process.env.APP_PORT}`);
});