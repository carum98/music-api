require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000

app.use(cors());

const swaggerUi = require("swagger-ui-express");
const specs = require("./lib/swagger");

const routes = require("./lib/routes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
