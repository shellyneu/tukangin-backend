const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync().then(() => {
  console.log("MySQL database connected");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tukang", require("./routes/tukangRoutes"));
app.use("/api/postJobs", require("./routes/postJobRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.use(express.static("storage"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
