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

const wedding = mongoose.model("wedding", rsvpSchema);

app.get("/", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    let newRSVP = new wedding({
        name: req.body.name,
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
        message: req.body.message
    })
    newRSVP.save();
    window.alert("Thank you for RSVPing to the Wedding")
    res.redirect("/");
})


const recSchema = new mongoose.Schema({
    attendees: Array,
    requirements: String,
    phone: String,
});

const reception = mongoose.model("reception", recSchema);

app.get("/reception", function(req, res){
    //res.send("server is working");
    res.sendFile(__dirname + "/reception.html");
})

app.post("/reception", function(req, res){
    let newRSVP = new reception({
        attendees: req.body.attendees,
        requirements: req.body.requirements,
        phone: req.body.phone,
    })
    newRSVP.save();
    res.redirect("/");
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("server is running on 3000");
})