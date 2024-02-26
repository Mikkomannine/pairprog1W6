require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoTaskRouter = require("./routers/todoTaskRouter");
const userRouter = require("./routers/userRouter");
const customMiddleware = require("./middleware/customMiddleware")

// Express app
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use(customMiddleware.requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

app.use("/api/todoTasks", todoTaskRouter);
app.use("/api/users", userRouter);

// app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);