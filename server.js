// Setup empty JS object to act as endpoint for all routes
projectData = {
  entryes: []
};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const port = 8080;
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

app.post("/", function(req, res) {
  const { temperature, date, userResponse } = req.body;
  projectData.entryes.push({
    temperature: temperature,
    date: date,
    userResponse: userResponse
  });
  res.json("added");
});

app.get("/values", (req, res) => {
  console.log(projectData);
  res.send(projectData);
});
