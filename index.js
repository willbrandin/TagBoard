const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();

const ev = require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/users"),
  tagBoardRoutes = require("./routes/tagboard");

app.use("/api/users", userRoutes);
app.use("/api/tag-board", tagBoardRoutes);

app.use((request, response, next) => {
  let error = new Error("Not Found");
  return response.status(404).json("Not Found");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App running ${process.env.PORT || 5000}`);
});
