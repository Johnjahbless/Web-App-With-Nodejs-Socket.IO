const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise;

const dburl = "Your cluster DB URL here"

const Message = mongoose.model("Message", {
    name: String,
    message: String
})


mongoose.connect(dburl, err => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.log(err)
            sendStatus(500)
        } else {
            res.send(messages);
        }
    })
    
});


app.get("/messages/:user", (req, res) => {
    const { user } = req.params;

    Message.find({name: user}, (err, messages) => {
        if (err) {
            console.log(err)
            sendStatus(500)
        } else {
            res.send(messages);
        }
    })
    
});


app.post("/messages", async (req, res) => {
    let message = new Message(req.body);
    try {
   
    const saveMessage = await message.save();
    const censored =  await Message.findOne({message: 'badword'}); 
        if (censored) 
         await Message.remove({_id: censored._id});
        else
            io.emit("message", req.body);
    
        res.sendStatus(200);
            
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
    
})

io.on("connection", socket => {
    console.log("user is connected")
})

const server = http.listen(5000, () => console.log(`server is listening on port: ${server.address().port}`))