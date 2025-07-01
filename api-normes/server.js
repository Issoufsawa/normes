const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const normesRoutes = require("./routes/normes");
const adminRoutes = require("./routes/admin");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/normes", normesRoutes);
app.use("/api/admin", adminRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("le serveur lance sur le port ${PORT} ");
});
