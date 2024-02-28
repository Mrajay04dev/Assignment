const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Client = require("./Models/Clients");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ajaybro9811:ajay@cluster0.fqetx3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Post Route
app.post("/add", async (req, res) => {
  try {
    const clientdetails = new Client(req.body);
    await clientdetails.save();
    res.status(201).json({
      status: "Success",
      data: {
        clientdetails,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});
// Delete Route
app.delete("/delete/:id", async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);

  try {
    res.status(204).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});
// get Route
app.get("/get", async (req, res) => {
  const clientdetails = await Client.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        clientdetails,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});
// Update Route
app.put("/update/:id", async (req, res) => {
  const updateclient = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updateclient,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
