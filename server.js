var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variables to store customers in queue
var booked = []
var waitlist = []

// Home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

// Make a Reservation page
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

// View Tables page
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

// API Table List link
app.get("/api/booked", function (req, res) {
    return res.json(booked)
});

// API Waitlist
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist)
});

// create a new table/waitlist when user submit a reservation request
app.post("/api/booked", function (req, res) {
    var newReservation = req.body

    if (booked.length < 5) {
        booked.push(newReservation)
        return true
    } else {
        waitlist.push(newReservation)
        return false
    }
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});