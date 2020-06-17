const express = require("express");
const fileUpload = require("express-fileupload");
//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join(__dirname, "/client/public/uploads/");

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "Debe seleccionar un archivo" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

//enpoint de descarga
app.get("/upload", (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //console.log(files);
    //listing all files using forEach
    let fileList = [];
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      //console.log(file);
      fileList.push({ fileName: file, Path: `/uploads/${file}` });
      console.log(file);
    });
    //console.log(files);
    console.log(fileList);
    //res.send(files);
    res.json(fileList);
  });
});

//
app.listen(5000, () => console.log("Server Started..."));
