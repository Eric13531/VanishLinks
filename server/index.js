const express = require("express");
const axios = require("axios");

const cors = require("cors");
var bodyParser = require("body-parser"); // Parse JSON data
const fs = require("fs");
var sqlite3 = require("sqlite3").verbose(); // Mongodb?
var path = require("path");
//require("dotenv").config();

const app = express();
const BASE_URL = "App base URL goes here";

var db = new sqlite3.Database("links.db");
db.run("CREATE TABLE IF NOT EXISTS links(id TEXT, url TEXT)");

app.engine("html", require("ejs").renderFile);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html"); // index.html will be the landing page
});

function randomstring(len) {
  // Generate a random string of len characters
  var res = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

<<<<<<< HEAD
// Eric
app.post("/upload", (req, res) => {
  res.send(req.body.url.toString());
  console.log(req.body.url.toString());
});
// End Eric

app.post("/uploaded", function(req, res) {
    var url = req.body.url.toString();
	var new_url = randomstring(5);
    db.serialize(() => {
        db.run('INSERT INTO links(id,url) VALUES(?,?)', [new_url, url], function(err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(new_url, req.body.url);
            res.render(process.cwd() + "/public/success.html", { new_url: new_url, base_url: BASE_URL }); // success.html will display the results of our post
        });
    });
});

app.get("/links/:link", (req, res) => {
  var key = req.params.link.toString();
  console.log(key);
  db.serialize(() => {
    db.each(
      "SELECT id ID, url URL FROM links WHERE id =?",
      [key],
      function (err, row) {
        if (err) {
          res.render(process.cwd() + "/public/failure.html"); // failure.html will display an error message
          console.log(err.message);
        }
        console.log("URL: ", row.URL); // delete after redirect
        res.redirect(`${row.URL}`);
        // TODO: delete the entry from our databse
      }
    );
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
