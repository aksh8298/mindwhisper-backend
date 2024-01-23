const express = require("express")
const mongoose = require("mongoose")
const Users = require("./src/models/users")
const { register, login, findUser } = require("./src/Controllers/users")
const server = express()
const cors = require("cors")
const { verifyToken, validateForm, isvalidated } = require("./src/Middlewares")
const { addForm } = require("./src/Controllers/Form")
server.use(express.json())
server.use(cors())
const http = require("http")
const app = http.createServer(server)
const { Server } = require('socket.io')
const io = new Server(app)
const { sendEmail } = require("./src/Helper/Email")
require('dotenv').config()


server.get("/", (req, res) => {

  res.status(200).json({
    uname: "akanksha",
    uphone: "8298213333"
  })
})
server.post("/register", register)
server.post("/login", login)
server.get("/get-user", verifyToken, findUser)
server.post("/addForm", validateForm, isvalidated, addForm,sendEmail)

const mongodb =process.env.MONGODB_url
mongoose.connect(mongodb)
  .then(data => console.log("Database Connected"))
  .catch(error => console.log(error))

const { join } = require('node:path');
server.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on("message", (message,room) => {
    console.log(`New Message recived in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
  })
  socket.on("join", (room)=>{
    socket.join(room)
    socket.emit("joined")
  }) 
   
  
})

port= process.env.PORT
app.listen(port, () => {
  console.log('server running at http://localhost:3000');
});