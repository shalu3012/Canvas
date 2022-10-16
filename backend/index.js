const express = require("express");
const cors=require('cors')
const app = express();
require("./db");
const dotenv = require("dotenv");
const PORT=process.env.PORT || 5000
const userRoutes=require("./routes/userRoutes")

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use("/user",userRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
