const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

let messages = [{
    name: "Tim",
    message: "Hello"},
    {
    name: "John",
    message: "Hello"
}]

app.get("/messages", (req, res) => {
    res.send(messages);
});


app.post("/messages", (req, res) => {
    messages.push(req.body);
    io.emit("message", req.body);
    res.sendStatus(200);
})

io.on("connection", socket => {
    console.log("user is connected")
})

const server = http.listen(5000, () => console.log(`server is listening on port: ${server.address().port}`))