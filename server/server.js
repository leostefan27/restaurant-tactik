const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

const app = express();

require("dotenv").config({ path: "../.env" });
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
