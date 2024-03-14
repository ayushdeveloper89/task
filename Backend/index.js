const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const { ItemRoute } = require("./Routes/ItemRoute");

const MONGO_URL = "mongodb://localhost:27017/task";

mongoose.connect(MONGO_URL).then(()=>
    console.log("connected")
).catch(()=>
    console.log("connection error")
);

app.use(cors());
app.use(express.json());

app.use("/api", ItemRoute);

app.listen(5000, ()=>{
    console.log("Backend server is running")
})