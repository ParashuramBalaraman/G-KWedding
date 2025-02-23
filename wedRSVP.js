const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://boompow13579:JuSlFk18EBKWOPZE@wedding.oaw6b1f.mongodb.net/?retryWrites=true&w=majority")

//RSVP Schema
const rsvpSchema = {
    name: String,
    attending: String,
    attendees: String,
    requirements: String,
    phone: String,
    message: String
}

const wedding = mongoose.model("wedding", rsvpSchema);

app.get("/", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/index.html");
})

app.post("/", async function(req, res){
    let newRSVP = new wedding({
        name: req.body.name,
        attending: req.body.attending,
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
        message: req.body.message
    })
    try {
        await newRSVP.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ success: false });
    }
    
})


const recSchema = new mongoose.Schema({
    attendees: Array,
    attending: String,
    requirements: String,
    phone: String,
});

const reception = mongoose.model("reception", recSchema);

app.get("/reception", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/reception.html");
})

app.post("/reception", async function(req, res){
    let newRSVP = new reception({
        attendees: req.body.attendees,
        attending: req.body.attending,
        requirements: req.body.requirements,
        phone: req.body.phone,
    })
    try {
        await newRSVP.save();
        res.end();
    } catch (err) {
        res.status(500).json({ success: false });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("server is running on 3000");
})