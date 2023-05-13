const express = require("express");
const mongoose = require("mongoose");
const { crt, car } = require("./cart.mongo");
const { ord, rec } = require("./order.mongo");
const cors = require("cors");

const app = express();

app.use(cors({}));
app.use(express.json());

mongoose.connection.on("open", () => {
  console.log("connection established");
});
mongoose.connection.on("error", (err) => {
  console.log("refused");
});

async function connectdata() {
  await mongoose.connect(
    "mongodb+srv://tyagiharshit720:tyagiboy@70@cluster0.twcpcpp.mongodb.net/?retryWrites=true&w=majority"
  );
  app.listen(5050, () => {
    console.log("http://localhost:5050/");
  });
}

app.post("/addOrder", async (req, res) => {
  const data = req.body;
  try {
    await rec.create(data);
   
    res.send("created");
  } catch (err) {
    console.log(err);
  }
});
app.post("/addCart", async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    await car.create(data);
    res.status(200).json("data send ")
    res.send("created");
  } catch (err) {
    console.log(err);
  }
});

connectdata();
