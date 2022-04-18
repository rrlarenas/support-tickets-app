const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlelware/errorMiddleware");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//conexion a DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// /Routes
app.use("/api/users", require("./routes/usersRoutes"));

app.use("/api/tickets", require("./routes/ticketRoutes"));

//serve frontend

if (process.env.NODE_ENV === "production") {
  //set build folderas static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Bienvenido" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor iniciado en puerto : ${PORT}`));
