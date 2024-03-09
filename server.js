const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync().then(() => {
  console.log("MySQL database connected");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
