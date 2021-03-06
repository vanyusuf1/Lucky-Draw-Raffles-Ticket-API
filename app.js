const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
app.use(express.json());
require("dotenv/config");


app.get("/", (req, res) => {
  res.send("hello Grofers!!");
});

// app.post("/students", (req, res) => {
//   res.send("hello all");
// });

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (req, res) => {
    console.log("Connected to the database");
  }
);


const userRoute = require("./routes/users");
app.use("/users", userRoute);

const raffleEvent = require("./routes/raffleEvent");
app.use("/raffleEvent", raffleEvent);

app.listen(port, () => {
  console.log(`connections is setup ${port}`);
});


