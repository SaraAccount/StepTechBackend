//B"SD
//YOU DONT NEED TO BE GREAT TO START, YOU NEED TO START TO BE GREAT👍

//require laiberies
const express = require('express');
const cors = require('cors');//cors
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

//require routes
const log = require("./routes/log");
const forum=require("./routes/forum");


//config liabery
dotenv.config();



// הוספת תוסף CORS
app.use(cors());  // הוספת ה-middleware של CORS

//convert to json
app.use(bodyParser.json());

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => console.error("Error connecting to DB:", err));

// app.use('/routes/log.js/postSign_in') 
   

//listen to port
app.listen(process.env.PORT, function () {
    console.log('listen to port');
})


//go to log and forum
app.use(log)
app.use(forum)


// app.use(cors({
//     origin: 'http://localhost:3333', // התאם לפי הצורך שלך
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

