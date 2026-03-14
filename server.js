const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("."));

let results = []; // хранение результатов

app.post("/submit-test",(req,res)=>{
    results.push(req.body);
    res.json({status:"ok"});
});

app.get("/get-results",(req,res)=>{
    res.json(results);
});

app.listen(3000,()=>console.log("Server running on port 3000"));