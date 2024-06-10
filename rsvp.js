const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connection to the first MongoDB database
const db1 = mongoose.createConnection("mongodb+srv://boompow13579:JuSlFk18EBKWOPZE@wedding.oaw6b1f.mongodb.net/?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true });

// Connection to the second MongoDB database
const db2 = mongoose.createConnection("mongodb+srv://boompow13579:t5HLzcGNrmDXVQHe@receptionrsvp.czjf05z.mongodb.net/?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true });

// RSVP Schema for the first database
const wedSchema = new mongoose.Schema({
    name: String,
    attendees: Number,
    requirements: String,
    phone: String,
    message: String
});

const RSVP = db1.model("RSVP", wedSchema);

// Some Other Schema for the second database
const recSchema = new mongoose.Schema({
    attendees: Array,
    requirements: String,
    phone: String,
});

const rsvps = db2.model("rsvps", recSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const newWed = new RSVP({
        name: req.body.name,
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
        message: req.body.message
    });
    newWed.save().then(() => res.redirect("/"));
});

app.get("/reception", (req, res) => {
    res.sendFile(__dirname + "/reception.html");
});

app.post("/reception", (req, res) => {
    const newRec = new rsvps({
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
    });
    newRec.save().then(() => res.redirect("/reception"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
