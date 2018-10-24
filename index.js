const serverless = require("serverless-http");
const express = require("express");
const fetch = require("node-fetch");
const remap = require("./remap");

const app = express();

app.get("/:locationId", function(req, res) {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  });
  fetch("http://houston.spacelandclock.com/clock5.aspx/getTimerInfo", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ param: "data", db: req.params.locationId })
  })
    .then(response => response.json())
    .then(json => {
      res.send(remap(json.d));
    });
});

module.exports.handler = serverless(app);
