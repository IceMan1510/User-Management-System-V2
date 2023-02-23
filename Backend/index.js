const express = require("express");
const userRoute = require("./Routers/userRoutes");
var cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
