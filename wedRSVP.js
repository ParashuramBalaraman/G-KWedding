const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://boompow13579:JuSlFk18EBKWOPZE@wedding.oaw6b1f.mongodb.net/?retryWrites=true&w=majority")

//RSVP Schema
const rsvpSchema = {
    name: String,
    attendees: Number,
    requirements: String,
    phone: String,
    message: String
}

const RSVP = mongoose.model("Rsvp", rsvpSchema);

app.get("/", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    let newRSVP = new RSVP({
        name: req.body.name,
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
        message: req.body.message
    })
    newRSVP.save();
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("server is running on 3000");
})