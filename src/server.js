require("dotenv").config();
require("./loader")
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', require('./router'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(process.env.APP_PORT, () => {
    console.log(`server running on port ${process.env.APP_PORT}`);
});