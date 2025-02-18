const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const libxmljs = require("libxmljs");

const app = express();

app.use(cors());
app.use(bodyParser.text({ type: "application/xml" })); // Expect XML data

// Load the XSD schema
const xsdData = fs.readFileSync("complaint_schema.xsd", "utf8");
const xsdDoc = libxmljs.parseXml(xsdData);

app.post("/submit_complaint", (req, res) => {
  const xmlData = req.body;

  // Parse XML from the request
  let xmlDoc;
  try {
    xmlDoc = libxmljs.parseXml(xmlData);
  } catch (error) {
    return res.status(400).send("Invalid XML format: " + error.message);
  }

  // Validate XML against the XSD
  const isValid = xmlDoc.validate(xsdDoc);
  if (!isValid) {
    return res
      .status(400)
      .send("XML Validation Errors: " + xmlDoc.validationErrors);
  }

  // If valid, process the complaint (e.g., store in a database)
  res.send("Complaint submitted successfully!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
