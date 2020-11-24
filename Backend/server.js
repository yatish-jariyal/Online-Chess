const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./routes/users')
const challenges = require('./routes/challenges')
const games = require('./routes/games')

const app = express()
app.use(express.json())
app.use(cors())
//routes -> baseurl/post/postid -> get and post
//schema -> 
//database uri
const db = require('./config/keys').mongoURI; //mongodb atlas

//connect to mongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("mongo db connection successful"))
.catch(err => console.log(err))

// Routes
app.use("/users", users)
app.use("/challenge", challenges)
app.use("/game", games)
const port = 5001;

app.listen(port, () => console.log(`Server running on port ${port}`))